import { app } from './app.js'
import { initDatabase } from './db/init.js'
import dotenv from 'dotenv'
import { createServer } from 'http' // Import HTTP server creation
import { Server as SocketIOServer } from 'socket.io' // Import Socket.IO Server
import { socketHandlers } from './socket/socketIoHandler.js'
dotenv.config()

const server = createServer(app) // Create an HTTP server
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

try {
  await initDatabase()
  // eslint-disable-next-line no-undef
  const PORT = process.env.PORT || 3001 // Set default port to 3001
  server.listen(PORT, () => {
    console.info(`Server running on http://localhost:${PORT}`)
  })
} catch (err) {
  console.error('Error connecting to database:', err)
}

socketHandlers(io) // Initialize socket handlers
