import { Response } from '../../network'
import { logger } from '../../global'
import { Session } from './_type'

export interface SessionResponse extends Response {
  status: boolean
  message: string
  datas: Array<Session>
  session?: Session
}

export class Exception {

  protected error: SessionResponse
  protected method: string
  protected url: string

  constructor(method: string, url: string, error: SessionResponse) {
    this.method = method.toUpperCase()
    this.url = url
    this.error = error
    this.log()
  }

  private log() {
    logger.warn(`${this.method}: ${this.url} error with message ${this.error.message}`)
  }
}