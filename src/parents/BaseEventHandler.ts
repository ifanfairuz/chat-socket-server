import { Socket } from 'socket.io'

export default class BaseEventHandler {

  protected email: string
  protected token: string
  protected image: string
  protected socket: Socket
  protected room: Socket

  constructor(socket: Socket) {
    this.socket = socket
    this.email = this.getEmail()
    this.image = this.getImage()
    this.token = this.getToken()
    this.room = this.socket.to(this.email)
  }

  private getEmail(): string {
    return this.socket.handshake.query['email'] || ''
  }

  private getToken(): string {
    return this.socket.handshake.query['token'] || ''
  }

  private getImage(): string {
    return this.socket.handshake.query['image'] || ''
  }
  
}