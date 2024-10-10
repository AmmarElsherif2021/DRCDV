import mongoose, { Schema } from 'mongoose'
//import bcrypt from 'bcrypt'

const messageSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
      required: true,
    },
    text: { type: String },
    attachments: [
      {
        filename: { type: String },
        contentType: { type: String },
        gridfsId: { type: mongoose.Schema.Types.ObjectId }, // Reference to GridFS file
      },
    ],
  },
  { timestamps: true },
)

export const Message = mongoose.model('Message', messageSchema)
