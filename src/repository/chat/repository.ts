import { Request } from '../../network'
import { ChatResponse, Exception } from './response'

export default class SessionRepository extends Request {

  /**
   * @description get history chat
   * @param {number} limit [default: 0] optional
   * @param {void} callback void
   *  @param {ChatResponse} callback.data ChatResponse
   * @returns {void} void
   * @public
   */
  public getHistory(limit: number = 0, callback: (data: ChatResponse) => void) {
    const url = `/chat/history${limit > 0 ? `/${limit}` : ``}`
    this.get<ChatResponse>(url)
      .then((data: ChatResponse) => {
        if (data.status) {
          callback(data)
        } else {
          return new Exception('get', url, data)
        }
      })
  }

  /**
   * @description get chat
   * @param {string} id string
   * @param {void} callback void
   *  @param {ChatResponse} callback.data ChatResponse
   * @returns {void}
   * @public
   */
  public getChat(id: string, callback: (data: ChatResponse) => void) {
    const url = `/chat/get/${id}`
    this.get<ChatResponse>(url)
      .then((data: ChatResponse) => {
        if (data.status) {
          callback(data)
        } else {
          return new Exception('get', url, data)
        }
      })
  }

  /**
   * @description read all chat
   * @param {Array<number>} chat_ids array of number
   * @param {void} callback void
   *  @param {ChatResponse} callback.data ChatResponse
   * @return {void}
   * @public
   */
  public readAll(chat_ids: Array<number>, callback: (data: ChatResponse) => void) {
    const url = `/chat/readall`
    this.post<ChatResponse>(url, { chat_ids })
      .then((data: ChatResponse) => {
        if (data.status) {
          callback(data)
        } else {
          return new Exception('post', url, data)
        }
      })
  }

  /**
   * @description read chat
   * @param {number} chat_id number
   * @param {void} callback void
   *  @param {ChatResponse} callback.data ChatResponse
   * @return {void}
   * @public
   */
  public read(chat_id: number, callback: (data: ChatResponse) => void) {
    const url = `/chat/read`
    this.post<ChatResponse>(url, { chat_id })
      .then((data: ChatResponse) => {
        if (data.status) {
          callback(data)
        } else {
          return new Exception('post', url, data)
        }
      })
  }

  /**
   * @description received chat
   * @param {number} chat_id number
   * @param {void} callback void
   *  @param {ChatResponse} callback.data ChatResponse
   * @return {void}
   * @public
   */
  public received(chat_id: number, callback: (data: ChatResponse) => void) {
    const url = `/chat/received`
    this.post<ChatResponse>(url, { chat_id })
      .then((data: ChatResponse) => {
        if (data.status) {
          callback(data)
        } else {
          return new Exception('post', url, data)
        }
      })
  }

  /**
   * @description get last chat with
   * @param {string} target string
   * @param {number} limit [default : 0] number
   * @param {void} callback void
   *  @param {ChatResponse} callback.data ChatResponse
   * @return {void}
   * @public
   */
  public getLastWith(target: string, limit: number = 0, callback: (data: ChatResponse) => void) {
    const url = `/chat/with/${target}/last${limit > 0 ? `/${limit}` : ``}`
    this.get<ChatResponse>(url)
      .then((data: ChatResponse) => {
        if (data.status) {
          callback(data)
        } else {
          return new Exception('get', url, data)
        }
      })
  }

  /**
   * @description get between chat with
   * @param {string} target string
   * @param {object} between object
   *  @param {string} between.start string
   *  @param {string} between.end string
   * @param {void} callback void
   *  @param {ChatResponse} callback.data ChatResponse
   * @return {void}
   * @public
   */
  public getBetweenWith(target: string, between: any, callback: (data: ChatResponse) => void) {
    const url = `/chat/with/${target}/between/${between.start}-${between.end}`
    this.get<ChatResponse>(url)
      .then((data: ChatResponse) => {
        if (data.status) {
          callback(data)
        } else {
          return new Exception('get', url, data)
        }
      })
  }

  /**
   * @description get delay chat with
   * @param {string} target string
   * @param {void} callback void
   *  @param {ChatResponse} callback.data ChatResponse
   * @return {void}
   * @public
   */
  public getDelayWith(target: string, callback: (data: ChatResponse) => void) {
    const url = `/chat/with/${target}/delay`
    this.get<ChatResponse>(url)
      .then((data: ChatResponse) => {
        if (data.status) {
          callback(data)
        } else {
          return new Exception('get', url, data)
        }
      })
  }

  /**
   * @description get unread chat with
   * @param {string} target string
   * @param {void} callback void
   *  @param {ChatResponse} callback.data ChatResponse
   * @return {void}
   * @public
   */
  public getUnreadWith(target: string, callback: (data: ChatResponse) => void) {
    const url = `/chat/with/${target}/unread`
    this.get<ChatResponse>(url)
      .then((data: ChatResponse) => {
        if (data.status) {
          callback(data)
        } else {
          return new Exception('get', url, data)
        }
      })
  }

  /**
   * @description get read all chat with
   * @param {string} target string
   * @param {void} callback void
   *  @param {ChatResponse} callback.data ChatResponse
   * @return {void}
   * @public
   */
  public getReadAllWith(target: string, callback: (data: ChatResponse) => void) {
    const url = `/chat/with/${target}/readall`
    this.post<ChatResponse>(url)
      .then((data: ChatResponse) => {
        if (data.status) {
          callback(data)
        } else {
          return new Exception('post', url, data)
        }
      })
  }

  /**
   * @description send chat
   * @param {object} chat object
   *  @param {string} chat.to string
   *  @param {string} chat.text string
   *  @param {number} chat.send_at number
   * @param {void} callback void
   *  @param {ChatResponse} callback.data ChatResponse
   * @return {void}
   * @public
   */
  public send(chat: {}, callback: (data: ChatResponse) => void) {
    const url = `/chat/send`
    this.post<ChatResponse>(url, chat)
      .then((data: ChatResponse) => {
        if (data.status) {
          callback(data)
        } else {
          return new Exception('post', url, data)
        }
      })
  }

}