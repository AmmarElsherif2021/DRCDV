import mongoose, { Schema } from 'mongoose'
const channelSchema = new Schema(
  {
    title: { type: String, required: true },
    members: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        role: { type: String, enum: ['admin', 'guest'], default: 'guest' },
      },
    ],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'message' }],
  },
  { timestamps: true },
)

export const Channel = mongoose.model('channel', channelSchema)
