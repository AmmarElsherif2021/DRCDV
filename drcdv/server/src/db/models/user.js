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

// // Pre-save hashing password
// userSchema.pre('save', async function (next) {
//   if (this.isModified('password') || this.isNew) {
//     this.password = await bcrypt.hash(this.password, 10)
//   }
//   next()
// })

// // Method to compare password
// userSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password)
// }
export const User = mongoose.model('User', userSchema)
