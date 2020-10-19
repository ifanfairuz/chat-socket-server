import axios, { AxiosInstance, AxiosResponse } from 'axios'
import Response, { Error } from './response'
import { logger } from '../global'
require('dotenv').config()

export default class Request {

  tunnel: AxiosInstance

  constructor () {
    this.tunnel = this.getTunnel()
  }

  private getTunnel(): AxiosInstance {
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
        logger.warn(`${error.config.method}: ${error.request.responseURL} error with request ${JSON.stringify(error.error)}`)
      } else {
        logger.warn(`${error.config.method}: ${error.config.url} error with error ${error.error.toJSON()}`)
      }
      
    })

    return tunnel
  }

  protected post < T extends Response > (url: string, params: {} = {}): Promise < T > {
    return this.tunnel
      .post(url, params)
      .then((response: AxiosResponse < {} > ) => {
        return response.data as T
      })
      .catch((error: Error) => {
        return error.error.data as T
      })
  }

  protected get < T extends Response > (url: string): Promise < T > {
    return this.tunnel
      .get(url)
      .then((response: AxiosResponse < {} > ) => {
        return response.data as T
      })
      .catch((error: Error) => {
        return error.error.data as T
      })
  }
}