import { ChatReceiver } from './chat'
import { Socket } from 'socket.io'

export class ChatEmit {
  public static INIT = 'chat-init'
  public static TARGET_SET = 'chat-target-set'
  public static LOAD_MORE = 'chat-load-more'
  public static CHAT_SEND = 'chat-send'
  public static CHAT_SENT = 'chat-sent'
  public static CHAT_RECEIVE = 'chat-receive'
  public static CHAT_READ = 'chat-read'
}

export class TokenEmit {
  public static TOKEN_REQUEST = 'token-request'
  public static TOKEN_VALID = 'token-valid'
}

export class SesionEmit {
  public static SESSION_CONNECT = 'session-connect'
  public static SESSION_DISCONNECT = 'session-disconnect'
  public static SESSION_RESET = 'session-reset'
}

export class ChatEvent {
  public static INIT = 'init-chat'
  public static SET_TARGET = 'set-target-chat'
  public static LOAD_MORE = 'load-more-chat'
  public static SEND_CHAT = 'send-chat'
  public static RECEIVE_CHAT = 'receive-chat'
  public static READ_CHAT = 'read-chat'
}

export class TokenEvent {
  public static SET_TOKEN = 'set-token'
}

export class SesionEvent {
  public static CONNECT_SESSION = 'connect-session'
  public static DISCONNECT_SESSION = 'disconnect-session'
  public static RESET_SESSION = 'reset-session'
}

export function createChatHandler(connection: Socket) : ChatReceiver {
  return new ChatReceiver(connection)
}