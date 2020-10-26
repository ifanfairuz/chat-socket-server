import { Request } from '../../network'
import { UserResponse, Exception } from './response'

export default class SessionRepository extends Request {

  /**
   * @description get all user
   * @param {void} callback void
   *  @param {UserResponse} callback.data UserResponse
   * @returns {void} void
   * @public
   */
  public getAll(callback: (data: UserResponse) => void) {
    const url = `/users/all`
    this.get<UserResponse>(url)
      .then((data: UserResponse) => {
        if (data.status) {
          callback(data)
        } else {
          return new Exception('get', url, data)
        }
      })
  }

  /**
   * @description get user
   * @param {string} email string
   * @param {void} callback void
   *  @param {UserResponse} callback.data UserResponse
   * @returns {void} void
   * @public
   */
  public getByEmail(email: string, callback: (data: UserResponse) => void) {
    const url = `/users/get/${email}`
    this.get<UserResponse>(url)
      .then((data: UserResponse) => {
        if (data.status) {
          callback(data)
        } else {
          return new Exception('get', url, data)
        }
      })
  }

}