import { Response } from '../../network'
import { logger } from '../../global'

export interface Chat extends Object {
  id: number
  from: string
  to: string
  text: string
  status: number
  send_at: number
  sent_at: number
  receive_at: number
  read_at: number
  created_at: string
  updated_at: string
}

export interface ChatHistory extends Object {
  target: string
  last: number
  text: string
}

export interface ChatResponse extends Response {
  status: boolean
  message: string
  datas: Array<Chat>
  chat?: Chat
  history?: Array<ChatHistory>
}

export class Exception {

  protected error: ChatResponse
  protected method: string
  protected url: string

  constructor(method: string, url: string, error: ChatResponse) {
    this.method = method.toUpperCase()
    this.url = url
    this.error = error
    this.log()
  }

  private log() {
    logger.warn(`${this.method}: /token/get error with message ${this.error.message}`)
  }
}