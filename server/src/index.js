/* eslint-disable no-undef */
import { app } from './app.js'
import { initDatabase } from './db/init.js'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { socketHandlers } from './socket/socketIoHandler.js'

dotenv.config()

const server = createServer(app)
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
})

;(async () => {
  try {
    await initDatabase()
    const PORT = process.env.PORT || 3001
    server.listen(PORT, () => {
      console.info(`Server running on http://localhost:${PORT}`)
    })

    io.on('connection', (socket) => {
      console.log('a user connected')
      socket.on('disconnect', () => {
        console.log('a user disconnected')
      })

      // Apply socket handlers
      socketHandlers(io, socket)
    })

    process.on('SIGINT', () => {
      console.log('SIGINT signal received: closing HTTP server')
      server.close(() => {
        console.log('HTTP server closed')
        process.exit(0)
      })
    })

    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server')
      server.close(() => {
        console.log('HTTP server closed')
        process.exit(0)
      })
    })
  } catch (err) {
    console.error('Error connecting to database:', err)
  }
})()
