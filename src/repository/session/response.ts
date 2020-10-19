import { Response } from '../../network'
import { logger } from '../../global'

export interface Session {
  id: number
  email: string
  socket_id: string
  created_at: string
  updated_at: string
}

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
    logger.warn(`${this.method}: /token/get error with message ${this.error.message}`)
  }
}