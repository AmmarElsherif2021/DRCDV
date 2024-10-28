import { app } from './app.js'
import { initDatabase } from './db/init.js'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { socketHandlers } from './socket/socketIoHandler.js'
import { allowedOrigins } from './config/cors.js'

dotenv.config()

const server = createServer(app)
const io = new SocketIOServer(server, {
  cors: {
    origin: allowedOrigins,
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
    const PORT = process.env.PORT || 3001
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`)
    })

    socketHandlers(io) // Modified to pass only io since socket is handled in socketHandlers

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
