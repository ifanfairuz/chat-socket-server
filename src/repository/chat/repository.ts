import { Request } from '../../network'
import { ChatResponse, Exception } from './response'

export default class SessionRepository extends Request {

  /**
   * get history chat
   * Params :
   * @number limit ? default: 0
   * @void callback
   *  -- @ChatResponse data
   * Return @void
   */
  public getHistory(limit: number = 0, callback: (data: ChatResponse) => void) {
    const url = `/chat/history${limit > 0 ? `/${limit}` : ``}`
    this.get<ChatResponse>(url)
      .then((data: ChatResponse) => {
        callback(data)
      })
      .catch((err: ChatResponse) => {
        return new Exception('get', url, err);
      })
  }

  /**
   * get chat
   * Params :
   * @string id
   * @void callback
   *  -- @ChatResponse data
   * Return @void
   */
  public getChat(id: string, callback: (data: ChatResponse) => void) {
    const url = `/chat/get/${id}`
    this.get<ChatResponse>(url)
      .then((data: ChatResponse) => {
        callback(data)
      })
      .catch((err: ChatResponse) => {
        return new Exception('get', url, err);
      })
  }

  /**
   * read all chat
   * Params :
   * @Array of @number chat_ids
   * @void callback
   *  -- @ChatResponse data
   * Return @void
   */
  public readAll(chat_ids: Array<number>, callback: (data: ChatResponse) => void) {
    const url = `/chat/readall`
    this.post<ChatResponse>(url, { chat_ids })
      .then((data: ChatResponse) => {
        callback(data)
      })
      .catch((err: ChatResponse) => {
        return new Exception('post', url, err);
      })
  }

  /**
   * read chat
   * Params :
   * @number chat_id
   * @void callback
   *  -- @ChatResponse data
   * Return @void
   */
  public read(chat_id: number, callback: (data: ChatResponse) => void) {
    const url = `/chat/read`
    this.post<ChatResponse>(url, { chat_id })
      .then((data: ChatResponse) => {
        callback(data)
      })
      .catch((err: ChatResponse) => {
        return new Exception('post', url, err);
      })
  }

  /**
   * received chat
   * Params :
   * @number chat_id
   * @void callback
   *  -- @ChatResponse data
   * Return @void
   */
  public received(chat_id: number, callback: (data: ChatResponse) => void) {
    const url = `/chat/received`
    this.post<ChatResponse>(url, { chat_id })
      .then((data: ChatResponse) => {
        callback(data)
      })
      .catch((err: ChatResponse) => {
        return new Exception('post', url, err);
      })
  }

  /**
   * get last chat with
   * Params :
   * @string target
   * @number limit ? default : 0
   * @void callback
   *  -- @ChatResponse data
   * Return @void
   */
  public getLastWith(target: string, limit: number = 0, callback: (data: ChatResponse) => void) {
    const url = `/chat/with/${target}/last${limit > 0 ? `/${limit}` : ``}`
    this.get<ChatResponse>(url)
      .then((data: ChatResponse) => {
        callback(data)
      })
      .catch((err: ChatResponse) => {
        return new Exception('get', url, err);
      })
  }

  /**
   * get between chat with
   * Params :
   * @string target
   * @object between
   *  -- @string start
   *  -- @string end
   * @void callback
   *  -- @ChatResponse data
   * Return @void
   */
  public getBetweenWith(target: string, between: any, callback: (data: ChatResponse) => void) {
    const url = `/chat/with/${target}/between/${between.start}-${between.end}`
    this.get<ChatResponse>(url)
      .then((data: ChatResponse) => {
        callback(data)
      })
      .catch((err: ChatResponse) => {
        return new Exception('get', url, err);
      })
  }

  /**
   * get delay chat with
   * Params :
   * @string target
   * @void callback
   *  -- @ChatResponse data
   * Return @void
   */
  public getDelayWith(target: string, callback: (data: ChatResponse) => void) {
    const url = `/chat/with/${target}/delay`
    this.get<ChatResponse>(url)
      .then((data: ChatResponse) => {
        callback(data)
      })
      .catch((err: ChatResponse) => {
        return new Exception('get', url, err);
      })
  }

  /**
   * get unread chat with
   * Params :
   * @string target
   * @void callback
   *  -- @ChatResponse data
   * Return @void
   */
  public getUnreadWith(target: string, callback: (data: ChatResponse) => void) {
    const url = `/chat/with/${target}/unread`
    this.get<ChatResponse>(url)
      .then((data: ChatResponse) => {
        callback(data)
      })
      .catch((err: ChatResponse) => {
        return new Exception('get', url, err);
      })
  }

  /**
   * get read all chat with
   * Params :
   * @string target
   * @void callback
   *  -- @ChatResponse data
   * Return @void
   */
  public getReadAllWith(target: string, callback: (data: ChatResponse) => void) {
    const url = `/chat/with/${target}/readall`
    this.post<ChatResponse>(url)
      .then((data: ChatResponse) => {
        callback(data)
      })
      .catch((err: ChatResponse) => {
        return new Exception('post', url, err);
      })
  }

  /**
   * send chat
   * Params :
   * @object chat
   *  -- @string to
   *  -- @string text
   *  -- @number send_at
   * @void callback
   *  -- @ChatResponse data
   * Return @void
   */
  public send(chat: {}, callback: (data: ChatResponse) => void) {
    const url = `/chat/send`
    this.post<ChatResponse>(url, chat)
      .then((data: ChatResponse) => {
        callback(data)
      })
      .catch((err: ChatResponse) => {
        return new Exception('post', url, err);
      })
  }

}