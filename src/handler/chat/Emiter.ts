import { Socket } from "socket.io";
import { ChatEmit } from "..";

export default class ChatEmiter {

  /**
   * @property {Socket} socket recent connection
   */
  protected socket: Socket

  /**
   * @constructor
   * @param {Socket} socket 
   */
  constructor(socket: Socket) {
    this.socket = socket
  }

  /**
   * @description emit after init done
   * @param {any extends Object} params  object
   *    @param {string} params.email string
   *    @param {any} params.datas any data send to room email
   * @return {void} return a void
   * @public
   */
  public onInit(params: any): void {
    this.socket
      .emit(ChatEmit.INIT, params.datas)
  }

/**
 * @description emit after target set
 * @param {any extends Object} params  object
 *    @param {string} params.email string
 *    @param {any} params.datas any data send to room email
 * @return {void} return a void
 * @public
 */
  public onTargetSet(params: any): void {
    this.socket
      .emit(ChatEmit.TARGET_SET, params.datas)
  }

/**
 * @description emit after user send chat
 * @param {any extends Object} params  object
 *    @param {string} params.email string
 *    @param {any} params.datas any data send to room email
 * @return {void} return a void
 * @public
 */
  public onChatSend(params: any): void {
    this.socket
      .to(params.email)
      .emit(ChatEmit.CHAT_SEND, params.datas)
  }

/**
 * @description emit after chat sent
 * @param {any extends Object} params  object
 *    @param {string} params.email string
 *    @param {any} params.datas any data send to room email
 * @return {void} return a void
 * @public
 */
  public onChatSent(params: any): void {
    this.socket
      .to(params.email)
      .emit(ChatEmit.CHAT_SENT, params.datas)
  }

 /**
 * @description emit after chat receive
 * @param {any extends Object} params  object
 *    @param {string} params.email string
 *    @param {any} params.datas any data send to room email
 * @return {void} return a void
 * @public
 */
  public onChatReceive(params: any): void {
    this.socket
      .to(params.email)
      .emit(ChatEmit.CHAT_RECEIVE, params.datas)
  }

/**
 * @description emit after chat receive
 * @param {any extends Object} params  object
 *    @param {string} params.email string
 *    @param {any} params.datas any data send to room email
 * @return {void} return a void
 * @public
 */
  public onChatRead(params: any): void {
    this.socket
      .to(params.email)
      .emit(ChatEmit.CHAT_READ, params.datas)
  }

}