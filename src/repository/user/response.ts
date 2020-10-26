import { Response } from '../../network'
import { logger } from '../../global'
import { User } from './_type'

/**
 * @description interface user response yang sesuai dengan server rest-api
 * @interface UserResponse @extends Response
 * @property {boolean} status boolean
 * @property {string} message string
 * @property {Array<User>} datas Array<User>
 * @property {User} user [null] User
 * @property {Array<UserHistory>} history [Array] Array<UserHistory>
 * @public
 */
export interface UserResponse extends Response {
  status: boolean
  message: string
  datas: Array<User>
  user?: User
}

/**
 * @description class Exception untuk handle request error with response
 * @class Exception
 * @public
 */
export class Exception {

  /**
   * @property {UserResponse} error
   */
  protected error: UserResponse

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
   * @param {UserResponse} error UserResponse
   * @public
   */
  constructor(method: string, url: string, error: UserResponse) {
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