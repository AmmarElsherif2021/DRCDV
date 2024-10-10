import express from 'express'
import cors from 'cors' // Import the CORS middleware to handle Cross-Origin Resource Sharing
import bodyParser from 'body-parser'

import { usersRoutes } from './routes/users.js'

const app = express() // Create an instance of an Express application

app.use(cors()) // Enable CORS for all routes
app.use(bodyParser.json()) // Use body-parser to parse JSON request bodies

usersRoutes(app) //Register users routes with express application

// Define a route for the root URL

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; connect-src 'self' http://localhost:3001",
  )
  next()
})
app.get('/', (req, res) => {
  res.send('Hello World from Express dcrcv!') // Send a response for the root URL
})

export { app } // Export the Express application instance
