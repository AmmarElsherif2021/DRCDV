/* eslint-disable no-undef */
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
console.log('DATABASE_URL::::::::', process.env.DATABASE_URL)

export function initDatabase() {
  return new Promise((resolve, reject) => {
    const DATABASE_URL = process.env.DATABASE_URL
    if (!DATABASE_URL) {
      return reject(
        new Error('DATABASE_URL is not defined in the environment variables'),
      )
    }

    mongoose.connect(DATABASE_URL)
    mongoose.connection.once('open', () => {
      console.log('Database connection established')
      resolve()
    })

    mongoose.connection.on('error', (err) => {
      console.error('Database connection error:', err)
      reject(err)
    })
  })
}
