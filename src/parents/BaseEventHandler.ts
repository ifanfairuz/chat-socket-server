import { Socket } from 'socket.io'

export default class BaseEventHandler {

  protected email: string
  protected token: string
  protected connection: Socket

  constructor(connection: Socket) {
    this.connection = connection
    this.email = this.getEmail()
    this.token = this.getToken()
  }

  private getEmail(): string {
    return this.connection.handshake.query('email') || ''
  }

  private getToken(): string {
    return this.connection.handshake.query('token') || ''
  }
  
}