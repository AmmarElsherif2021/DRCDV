import express from 'express'
import { createServer } from 'http' // create an HTTP server
import { Server as SocketIOServer } from 'socket.io' // Import Socket.IO Server

// Instance of an Express application for Socket.IO
const app = express()
const server = createServer(app)
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected')

  // Listen for messages and handle them
  socket.on('message', (msg) => {
    console.log('Message received:', msg)
    io.emit('message', msg) // Broadcast message to all connected clients
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

// Start the Socket.IO server on a different port
const SOCKET_PORT = process.env.SOCKET_PORT || 3002
server.listen(SOCKET_PORT, () => {
  console.log(`Socket.IO server is running on port ${SOCKET_PORT}`)
})
