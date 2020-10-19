import { Socket } from 'socket.io'
import BaseEvent from '../parents/BaseEventHandler'
import { ChatRepository, SessionRepository, TokenRepository } from '../repository'
import { SesionEmit, TokenEmit } from './'
import { SessionResponse } from '../repository/session/response'

export default class Receiver extends BaseEvent {

  protected sessionRepository: SessionRepository
  protected chatRepository: ChatRepository
  protected tokenRepository: TokenRepository

  constructor(connection: Socket) {
    super(connection)
    this.sessionRepository = new SessionRepository()
    this.chatRepository = new ChatRepository()
    this.tokenRepository = new TokenRepository()
  }

  public onSetToken(token: string): void
  {
    this.token = token
  }

  public emitTokenRequest(): void
  {
    this.connection.emit(TokenEmit.TOKEN_REQUEST, {
      email: this.email
    })
  }

  public emitTokenValid(): void
  {
    this.connection.emit(TokenEmit.TOKEN_VALID, {
      email: this.email,
      token: this.token
    })
  }

  public onConectSession(callback?: (res: SessionResponse) => void): void
  {
    const param: object = {
      email: this.email,
      socket: this.connection.id
    }

    this.sessionRepository.connect(param, res => {
      this.emitSessionConnect()
      if (callback) callback(res)
    })
  }

  public onDisconnectSession(callback?: (res: SessionResponse) => void): void
  {
    const param: object = {
      email: this.email,
      socket: this.connection.id
    }

    this.sessionRepository.disconnect(param, res => {
      this.emitSessionDisconnect()
      if (callback) callback(res)
    })
  }

  public onResetSession(callback?: (res: SessionResponse) => void): void
  {
    const param: object = {
      email: this.email
    }

    this.sessionRepository.reset(param, res => {
      this.emitSessionReset()
      if (callback) callback(res)
    })
  }

  public emitSessionConnect(): void
  {
    this.connection.emit(SesionEmit.SESSION_CONNECT, {
      email: this.email,
      token: this.token
    })
  }

  public emitSessionDisconnect(): void {
    this.connection.emit(SesionEmit.SESSION_DISCONNECT, {
      email: this.email,
      token: this.token
    })
  }

  public emitSessionReset(): void {
    this.room.emit(SesionEmit.SESSION_RESET, {
      email: this.email,
      token: this.token,
      reset_from: this.connection.id
    })
  }

  public onConnected(callback?: (param: any) => void): void
  {
    this.emitTokenRequest()

    this.tokenRepository.getToken(this.email, res => {
      const token = res.token
      this.onSetToken(token)
      this.emitTokenValid()
      
      this.onConectSession(res => {
        this.connection.join(this.email)

        this.emitSessionConnect()

        if (callback) callback({
          email: this.email,
          token: this.token
        })
      })
    })
  }

  public onDisconnected(callback?: (res: SessionResponse) => void): void
  {
    this.connection.leave(this.email)

    this.onDisconnectSession(res => {
      this.emitSessionDisconnect()
      if (callback) callback(res)
    })
  }

}