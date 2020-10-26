import express from 'express'
import socket, { Socket } from 'socket.io'
import _http from 'http'
import { ChatEmit, ChatEvent, SessionEmit, SessionEvent, TokenEmit, TokenEvent, createChatHandler } from './handler'
import { logger } from './global'
require('dotenv').config()

let port = parseInt(process.env.PORT || '8000')
let app = express();
let http = _http.createServer(app);
let io = socket(http, {
  pingTimeout: 20000,
  pingInterval: 20000,
});

/**
 * Middleware Server
 * 
 * throw Authentication Error when no query with
 * email
 */
io.use((socket, next) => {
  if (socket.handshake.query['email'] != null) {
    return next();
  }

  return new Error('Authentication Error, user must be defined');
});

/**
 * Automatically called when user connected to socket with namespace /chat
 */
io.on('connection', function (socket: Socket) {
  let event = createChatHandler(socket)
  
  socket.on('disconnect', () => event.onDisconnected())
  event.onConnected(res => {
    socket.on(TokenEvent.SET_TOKEN, (token: string) => event.onSetToken(token))
    socket.on(SessionEvent.CONNECT_SESSION, (callback?: (param: any) => void) => event.onConectSession(callback))
    socket.on(SessionEvent.DISCONNECT_SESSION, (callback?: (param: any) => void) => event.onDisconnectSession(callback))
    socket.on(SessionEvent.RESET_SESSION, (callback?: (param: any) => void) => event.onResetSession(callback))

    socket.on(ChatEvent.LIST_USER, (callback?: (param: any) => void) => event.onListUser(callback))
    socket.on(ChatEvent.INIT, () => event.onInit())
    socket.on(ChatEvent.SET_TARGET, (target: string, flag?: string) => event.onSetTarget(target, flag))
  })
});

app.get('/', function (req, res) {
  res.send(`Version ${process.env.npm_package_version}`);
});

/**
* Register socket
*/
http.listen(port, () => logger.info(`Connection Established on port: ${port}. Version ${process.env.npm_package_version}`));