import { Response } from '../../network'
import { logger } from '../../global'
import { Chat, ChatHistory } from './_type'

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