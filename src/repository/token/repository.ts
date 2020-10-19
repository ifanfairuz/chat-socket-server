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
    this.post<TokenResponse>('/token/get', { email })
      .then((data: TokenResponse) => {
        callback(data)
      })
      .catch((err: TokenResponse) => {
        return new Exception('post', '/token/get', err);
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
    this.post<TokenResponse>('/token/purge')
      .then((data: TokenResponse) => {
        callback(data)
      })
      .catch((err: TokenResponse) => {
        return new Exception('post', '/token/purge', err);
      })
  }

}