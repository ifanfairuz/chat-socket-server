import { Socket } from 'socket.io'
import BaseEvent from '../parents/BaseEventHandler'
import { SessionRepository, TokenRepository } from '../repository'
import { SessionEmit, TokenEmit } from './'
import { SessionResponse } from '../repository/session/response'

export default class Receiver extends BaseEvent {

  protected sessionRepository: SessionRepository
  protected tokenRepository: TokenRepository

  constructor(socket: Socket) {
    super(socket)
    this.sessionRepository = new SessionRepository()
    this.tokenRepository = new TokenRepository()
    this.sessionRepository.setToken(this.token)
    this.tokenRepository.setToken(this.token)
  }

  public onSetToken(token: string): void {
    this.token = token
    this.sessionRepository.setToken(token)
    this.tokenRepository.setToken(token)
  }

  public emitTokenRequest(): void {
    this.socket.emit(TokenEmit.TOKEN_REQUEST, {
      email: this.email
    })
  }

  public emitTokenValid(): void {
    this.socket.emit(TokenEmit.TOKEN_VALID, {
      email: this.email,
      token: this.token
    })
  }

  public onConectSession(callback ? : (res: SessionResponse) => void): void {
    const param: object = {
      email: this.email,
      socket: this.socket.id
    }

    this.sessionRepository.connect(param, res => {
      this.emitSessionConnect()
      if (callback) callback(res)
    })
  }

  public onDisconnectSession(callback ? : (res: SessionResponse) => void): void {
    const param: object = {
      email: this.email,
      socket: this.socket.id
    }

    this.sessionRepository.disconnect(param, res => {
      this.emitSessionDisconnect()
      if (callback) callback(res)
    })
  }

  public onResetSession(callback ? : (res: SessionResponse) => void): void {
    const param: object = {
      email: this.email
    }

    this.sessionRepository.reset(param, res => {
      this.emitSessionReset()
      if (callback) callback(res)
    })
  }

  public emitSessionConnect(): void {
    this.socket.emit(SessionEmit.SESSION_CONNECT, {
      email: this.email,
      token: this.token
    })
  }

  public emitSessionDisconnect(): void {
    this.socket.emit(SessionEmit.SESSION_DISCONNECT, {
      email: this.email,
      token: this.token
    })
  }

  public emitSessionReset(): void {
    this.room.emit(SessionEmit.SESSION_RESET, {
      email: this.email,
      token: this.token,
      reset_from: this.socket.id
    })
  }

  public connecSession(callback?: (param: any) => void) {
    this.onConectSession(res => {
      this.socket.join(this.email)
      this.emitSessionConnect()

      if (callback) callback({
        email: this.email,
        token: this.token
      })
    })
  }

  public onConnected(callback ? : (param: any) => void): void {
    this.emitTokenRequest()

    if (this.token == '') {
      this.tokenRepository.getToken(this.email, res => {
        const token = res.token
        this.onSetToken(token)
        this.emitTokenValid()
  
        this.connecSession(callback)
      })
    } else {
      this.connecSession(callback)
    }
  }

  public onDisconnected(callback ? : (res: SessionResponse) => void): void {
    this.socket.leave(this.email)

    if (this.token != '') {
      this.onDisconnectSession(res => {
        this.emitSessionDisconnect()
        if (callback) callback(res)
      })
    }
  }

}