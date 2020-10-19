import { Request } from '../../network'
import { ChatResponse, Exception } from './response'

export default class SessionRepository extends Request {

  /**
   * session get all
   * Params :
   * @void callback
   *  -- @ChatResponse data
   * Return @void
   */
  public getAll(callback: (data: ChatResponse) => void) {
    const url = '/session/all'
    this.get<ChatResponse>(url)
      .then((data: ChatResponse) => {
        callback(data)
      })
      .catch((err: ChatResponse) => {
        return new Exception('get', url, err);
      })
  }

}