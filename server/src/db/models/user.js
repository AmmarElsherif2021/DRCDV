import mongoose, { Schema } from 'mongoose'
//import bcrypt from 'bcrypt'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: { type: String, enum: ['online', 'offline'], default: 'offline' },
  },
  { timestamps: true },
)

export const User = mongoose.model('User', userSchema)
