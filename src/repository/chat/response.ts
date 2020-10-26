import { Response } from '../../network'
import { logger } from '../../global'
import { Chat, ChatHistory } from './_type'

/**
 * @description interface chat response yang sesuai dengan server rest-api
 * @interface ChatResponse @extends Response
 * @property {boolean} status boolean
 * @property {string} message string
 * @property {Array<Chat>} datas Array<Chat>
 * @property {Chat} chat [null] Chat
 * @property {Array<ChatHistory>} history [Array] Array<ChatHistory>
 * @public
 */
export interface ChatResponse extends Response {
  status: boolean
  message: string
  datas: Array<Chat>
  chat?: Chat
  history?: Array<ChatHistory>
}

/**
 * @description class Exception untuk handle request error with response
 * @class Exception
 * @public
 */
export class Exception {

  /**
   * @property {ChatResponse} error
   */
  protected error: ChatResponse

  /**
   * @property {string} method
   */
  protected method: string

  /**
   * @property {string} url
   */
  protected url: string

  /**
   * @constructor
   * @description constructor Exception
   * @param {string} method string
   * @param {string} url string
   * @param {ChatResponse} error ChatResponse
   * @public
   */
  constructor(method: string, url: string, error: ChatResponse) {
    this.method = method.toUpperCase()
    this.url = url
    this.error = error
    this.log()
  }

  /**
   * @description log error
   * @return {void} void
   * @private
   */
  private log(): void {
    logger.warn(`${this.method}: ${this.url} error with message ${this.error.message}`)
  }
}