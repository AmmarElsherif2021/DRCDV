/* eslint-disable no-undef */
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { usersRoutes } from './routes/users.js'
import { messagesRoutes } from './routes/message.js'
import { channelsRoutes } from './routes/channel.js'

const app = express()

app.use(
  cors({
    origin: '*', // During initial deployment. Update this later with specific domains
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
