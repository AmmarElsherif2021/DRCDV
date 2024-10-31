import mongoose, { Schema } from 'mongoose'

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
    status: {
      type: String,
      enum: ['online', 'offline'],
      default: 'offline',
    },
    profileImage: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true },
)

export const User = mongoose.model('User', userSchema)
