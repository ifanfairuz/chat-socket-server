import BaseEvent from '../parents/BaseEventHandler'
import { ChatBroadcaster, ChatEmiter, ChatReceiver } from './chat'
import { SessionBroadcaster, SessionEmiter, SessionReceiver } from './session'
import { TokenBroadcaster, TokenEmiter, TokenReceiver } from './token'
import { Socket } from 'socket.io'

export default class Receiver extends BaseEvent {

  public chatHandler: object
  public tokenHandler: object
  public sessionHandler: object

  constructor(connection: Socket) {
    super(connection)
    this.chatHandler = this.getChatHandler()
    this.sessionHandler = this.getSessionHandler()
    this.tokenHandler = this.getTokenHandler()
  }

  private getChatHandler(): object {
    return {
      receiver: new ChatReceiver(this),
      emiter: new ChatEmiter(),
      broadcaster: new ChatBroadcaster()
    }
  }

  private getSessionHandler(): object {
    return {
      receiver: new SessionReceiver(this),
      emiter: new SessionEmiter(),
      broadcaster: new SessionBroadcaster()
    }
  }

  private getTokenHandler(): object {
    return {
      receiver: new TokenReceiver(this),
      emiter: new TokenEmiter(),
      broadcaster: new TokenBroadcaster()
    }
  }

}