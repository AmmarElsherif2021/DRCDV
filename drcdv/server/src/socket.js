import { Server } from 'socket.io'

let io

const init = (httpServer) => {
  io = new Server(httpServer)
  return io
}

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io is not initialized')
  }
  return io
}

export { init, getIO }
