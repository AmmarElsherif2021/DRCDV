import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { usersRoutes } from './routes/users.js'
import { messagesRoutes } from './routes/message.js'
import { channelsRoutes } from './routes/channel.js'

const app = express()

// Added Vercel
const allowedOrigins = [
  'http://localhost:5173',
  'https://drcdv-ammarelsherifs-projects.vercel.app',
  'https://drcdv.vercel.app',
]

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests) IMPOTANT!!
      if (!origin) return callback(null, true)

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)
app.use(bodyParser.json())

// Register routes
usersRoutes(app)
messagesRoutes(app)
channelsRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello World from Express dcrcv!')
})

export { app }
