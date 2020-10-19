import { Request } from '../../network'
import { SessionResponse, Exception } from './response'

export default class SessionRepository extends Request {

  /**
   * session get all
   * Params :
   * @void callback
   *  -- @SessionResponse data
   * Return @void
   */
  public getAll(callback: (data: SessionResponse) => void) {
    const url = '/session/all'
    this.get<SessionResponse>(url)
      .then((data: SessionResponse) => {
        callback(data)
      })
      .catch((err: SessionResponse) => {
        return new Exception('get', url, err);
      })
  }

  /**
   * session get
   * Params :
   * @string socket_id
   * @void callback
   *  -- @SessionResponse data
   * Return @void
   */
  public getSession(socket_id: string, callback: (data: SessionResponse) => void) {
    const url = `/session/get/${socket_id}`
    this.get<SessionResponse>(url)
      .then((data: SessionResponse) => {
        callback(data)
      })
      .catch((err: SessionResponse) => {
        return new Exception('get', url, err);
      })
  }

  /**
   * connect to get session
   * Params :
   * @object params
   *  -- @string email
   *  -- @string socket
   * @void callback
   *  -- @SessionResponse data
   * Return @void
   */
  public connect(params: {}, callback: (data: SessionResponse) => void) {
    const url = `/session/connect`
    this.post<SessionResponse>(url, params)
      .then((data: SessionResponse) => {
        callback(data)
      })
      .catch((err: SessionResponse) => {
        return new Exception('post', url, err);
      })
  }

  /**
   * disconnect to delete session
   * Params :
   * @object params
   *  -- @string email
   *  -- @string socket
   * @void callback
   *  -- @SessionResponse data
   * Return @void
   */
  public disconnect(params: {}, callback: (data: SessionResponse) => void) {
    const url = `/session/disconnect`
    this.post<SessionResponse>(url, params)
      .then((data: SessionResponse) => {
        callback(data)
      })
      .catch((err: SessionResponse) => {
        return new Exception('post', url, err);
      })
  }

  /**
   * reset to delete session
   * Params :
   * @object params
   *  -- @string email
   * @void callback
   *  -- @SessionResponse data
   * Return @void
   */
  public reset(params: {}, callback: (data: SessionResponse) => void) {
    const url = `/session/reset`
    this.post<SessionResponse>(url, params)
      .then((data: SessionResponse) => {
        callback(data)
      })
      .catch((err: SessionResponse) => {
        return new Exception('post', url, err);
      })
  }

}