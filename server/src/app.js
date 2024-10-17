/* eslint-disable no-undef */
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { usersRoutes } from './routes/users.js'
import { messagesRoutes } from './routes/message.js'
import { channelsRoutes } from './routes/channel.js'

const app = express()

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

// Register routes
usersRoutes(app)
messagesRoutes(app)
channelsRoutes(app)

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; connect-src 'self' http://localhost:3002",
  )
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World from Express dcrcv!')
})

export { app }
