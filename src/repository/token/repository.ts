import { Request } from '../../network'
import { TokenResponse, Exception } from './response'

export default class TokenRepository extends Request {
  
  /**
   * token get for access api
   * Params :
   * @string email
   * @void callback
   *  -- @TokenResponse data
   * Return @void
   */
  public getToken(email: string, callback: (data: TokenResponse) => void) {
    const url = '/token/get'
    this.post<TokenResponse>(url, { email })
      .then((data: TokenResponse) => {
        if (data.status) {
          callback(data)
        } else {
          return new Exception('post', url, data)
        }
      })
  }

  /**
   * token purge for this user
   * Params :
   * @void callback
   *  -- @TokenResponse data
   * Return @void
   */
  public purge(callback: (data: TokenResponse) => void) {
    const url = '/token/purge'
    this.post<TokenResponse>(url)
      .then((data: TokenResponse) => {
        if (data.status) {
          callback(data)
        } else {
          return new Exception('post', url, data)
        }
      })
  }

}