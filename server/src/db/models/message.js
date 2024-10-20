import mongoose, { Schema } from 'mongoose'
import { Buffer } from 'buffer'
const attachmentSchema = new Schema({
  filename: { type: String },
  contentType: { type: String },
  data: { type: Buffer },
})

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
    attachments: [attachmentSchema],
  },
  { timestamps: true },
)

export const Message = mongoose.model('Message', messageSchema)
