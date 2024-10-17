import dotenv from 'dotenv'
dotenv.config()

import { initDatabase } from './db/init.js'
import { User } from './db/models/user.js'

await initDatabase()
console.log('DATABASE_URL:', process.env.DATABASE_URL)
const user = new User({
  username: 'Ammar3sd432',
  email: 'ad@nccx.com',
  password: 'to be hxxashed',
})

await user.save()

const createdUser = await user.save()

await User.findByIdAndUpdate(createdUser._id, {
  $set: { username: 'Ammar23 modified' },
})

const users = await User.find()
console.log(users)
