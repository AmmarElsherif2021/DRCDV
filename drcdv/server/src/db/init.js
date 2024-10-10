import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
console.log('DATABASE_URL::::::::', process.env.DATABASE_URL)
export function initDatabase() {
  const DATABASE_URL = process.env.DATABASE_URL
  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in the environment variables')
  }

  mongoose.connect(DATABASE_URL)

  mongoose.connection.on('open', () => {
    console.log('Database connection established')
  })

  mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err)
  })
}
