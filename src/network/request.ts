import axios, { AxiosInstance, AxiosResponse } from 'axios'
import Response, { Error } from './response'
import { logger } from '../global'
require('dotenv').config()

export default class Request {

  tunnel: AxiosInstance

  constructor () {
    this.tunnel = this.getTunnel()
  }

  getTunnel(): AxiosInstance {
    const api_server: string = process.env.API_SERVER || ''

    const tunnel = axios.create({
      baseURL: api_server,
      headers: {

      }
    })

    tunnel.interceptors.response.use(res => res, error => {
      if (error.response) {
        return Promise.reject({
            type: 'with-response',
            error: error.response
          } as Error)
      } else if (error.request) {
        Promise.reject({
            type: 'with-request',
            error: error.request
          } as Error)
      }

      Promise.reject({
          type: 'error',
          error
        } as Error)
    })

    return tunnel
  }

  post < T extends Response > (url: string, params: {}): Promise < void | T > {
    return this.tunnel
      .post(url, params)
      .then((response: AxiosResponse < {} > ) => {
        return response.data as T
      })
      .catch((error: Error) => {
        if (error.type == 'with-response') {
          Promise.reject(error.error.data as Response)
        } else if (error.type == 'with-request') {
          logger.warn(`POST: ${url} error with request ${JSON.stringify(error.error)}`)
        } else {
          logger.warn(`POST: ${url} error with error ${error.error.toJSON()}`)
        }
      })
  }

  get < T extends Response > (url: string): Promise < void | T > {
    return this.tunnel
      .get(url)
      .then((response: AxiosResponse < {} > ) => {
        return response.data as T
      })
      .catch((error: Error) => {
        if (error.type == 'with-response') {
          Promise.reject(error.error.data as Response)
        } else if (error.type == 'with-request') {
          logger.warn(`POST: ${url} error with request ${JSON.stringify(error.error)}`)
        } else {
          logger.warn(`POST: ${url} error with error ${error.error.toJSON()}`)
        }
      })
  }
}