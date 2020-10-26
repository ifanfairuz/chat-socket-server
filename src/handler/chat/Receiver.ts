import BaseHandler from '../Handler'
import { Socket } from 'socket.io'
import { ChatRepository, UserRepository } from '../../repository'
import { ChatResponse } from '../../repository/chat/response'
import { ChatEmiter } from '.'
import { logger } from '../../global'
import { isEmpty } from '../../global/functions'

export default class ChatReceiver extends BaseHandler {

  protected chatRepository: ChatRepository
  protected userRepository: UserRepository
  protected chatEmiter: ChatEmiter
  protected target: string = ''


  /**
   * @constructor
   * @param {socket.Socket} socket 
   */
  constructor(socket: Socket) {
    super(socket)
    this.chatRepository = new ChatRepository()
    this.chatRepository.setToken(this.token)
    this.userRepository = new UserRepository()
    this.userRepository.setToken(this.token)
    this.chatEmiter = new ChatEmiter(socket)
  }

  /**
   * @description on set token
   * @param {string} token string
   * @return {void} void
   * @public
   * @override
   */
  public onSetToken(token: string): void {
    this.token = token
    this.sessionRepository.setToken(token)
    this.tokenRepository.setToken(token)
    this.chatRepository.setToken(token)
    this.userRepository.setToken(token)
  }

  /**
   * @description on receive event ChatEvent.INIT
   * @return {void} void
   * @public
   */
  public onInit(): void {
    this.chatRepository.getHistory(0, (res: ChatResponse) => {
      this.chatEmiter.onInit({
        email: this.email,
        datas: {
          history: res.history,
          email: this.email
        }
      })
    })
  }

  /**
   * @description on list all user ChatEvent.LIST_USER
   * @param {void} callback [function => void] optional
   * @return {void}
   * @public
   */
  public onListUser(callback?: (param: any) => void): void {
    this.userRepository.getAll(res => {
      if (callback) callback(res.datas)
    })
  }

  /**
   * @description on receive event ChatEvent.SET_TARGET
   * @param {string} target string target
   * @return {void}
   * @public
   */
  public onSetTarget(target: string): void {
    this.target = target

    this.userRepository.getByEmail(target, ({ user }) => {
      this.chatRepository.getLastWith(target, 20, res => {
        this.chatEmiter.onTargetSet({
          email: this.email,
          datas: {
            email: this.email,
            target: user,
            chats: res.datas,
          }
        })
      })
    })

  }

  /**
   * @description on receive event ChatEvent.LOAD_MORE
   * @param {number} last [null] optional
   * @param {void} callback [function => void] optional
   * @return {void} void
   * @public
   */
  public onLoadMore(last?: number, callback?: (res: any) => void): void {
    if (isEmpty(this.target)) {
      logger.info(`Err: no target defined`)
      return;
    }

    this.chatRepository.getLastWith(this.target, 30, res => {
      const param = {
        ...res,
        email: this.email,
        target: this.target
      }
      if (callback) callback(param);
    })
  }

  /**
   * @description on receive event ChatEvent.SEND_CHAT
   * @param {any} param chat
   *  @param {string} to target
   *  @param {string} text chat
   *  @param {number} send_at unix time number
   * @param {void} callback [function => void] optional
   * @return {void} void
   * @public
   */
  public onSendChat(param: any, callback?: (res: any) => void): void {
    if (isEmpty(this.target)) {
      logger.info(`Err: no target defined`)
      return;
    }

    const chat = {
      to: this.target,
      text: param.text,
      send_at: param.send_at
    }

    this.chatEmiter.onChatSend({
      email: this.email,
      datas: chat
    })

    this.chatRepository.send(chat, res => {
      const param = {
        ...res,
        email: this.email,
        target: this.target
      }

      if (callback) callback(param);

      this.chatEmiter.onChatSent({
        email: this.email,
        datas: param
      })

    })
  }

  /**
   * @description on receive event ChatEvent.RECEIVE_CHAT
   * @param {number} chat_id number
   * @param {void} callback [function => void] optional
   * @return {void} void
   * @public
   */
  public onReceiveChat(chat_id: number, callback?: (res: any) => void): void {
    this.chatRepository.received(chat_id, res => {
      const param = {
        ...res,
        email: this.email,
        target: this.target
      }

      if (callback) callback(param);

      this.chatEmiter.onChatReceive({
        email: this.email,
        datas: param
      })

    })
  }

  /**
   * @description on receive event ChatEvent.READ_CHAT
   * @param {number} chat_id number
   * @param {void} callback [function => void] optional
   * @return {void} void
   * @public
   */
  public onReadChat(chat_id: number, callback?: (res: any) => void): void {
    this.chatRepository.read(chat_id, res => {
      const param = {
        ...res,
        email: this.email,
        target: this.target
      }

      if (callback) callback(param);

      this.chatEmiter.onChatRead({
        email: this.email,
        datas: param
      })

    })
  }

}