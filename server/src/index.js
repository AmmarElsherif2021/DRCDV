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
    origin: '*', // During initial deployment
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
})

// Export for Vercel serverless
export default app

const startServer = async () => {
  try {
    await initDatabase()

    if (!process.env.VERCEL) {
      // Start server normally
      const PORT = process.env.PORT || 3001
      server.listen(PORT, () => {
        console.info(`Server running on http://localhost:${PORT}`)
      })
    }

    io.on('connection', (socket) => {
      console.log('a user connected')
      socket.on('disconnect', () => {
        console.log('a user disconnected')
      })
      // Apply socket handlers
      socketHandlers(io, socket)
    })

    // Graceful shutdown handlers
    process.on('SIGINT', gracefulShutdown)
    process.on('SIGTERM', gracefulShutdown)
  } catch (err) {
    console.error('Error connecting to database:', err)
    process.exit(1)
  }
}

const gracefulShutdown = () => {
  console.log('Shutdown signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
    process.exit(0)
  })
}

startServer()
