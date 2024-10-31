import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../db/models/user.js'

// Create new user function
export async function createUser({ username, email, password, profileImage }) {
  if (!username || !email || !password) {
    throw new Error('Username, email, and password are required')
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new Error('Email is already in use')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const userData = {
    username,
    email,
    password: hashedPassword,
  }

  if (profileImage) {
    userData.profileImage = profileImage
  }

  const user = new User(userData)
  return await user.save()
}

// Login user function
export async function loginUser({ username, password }) {
  if (!username || !password) {
    throw new Error('Username and password are required')
  }

  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('Invalid username')
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })

  return token
}

// Get user by ID function
export async function getUserInfoById(userId) {
  if (!userId) {
    throw new Error('User ID is required')
  }

  try {
    const user = await User.findById(userId)
    if (!user) {
      return { error: 'User not found' }
    }
    return { username: user.username, email: user.email }
  } catch (err) {
    return { error: err.message }
  }
}

// Get users function
export async function getUsers() {
  try {
    const users = await User.find()
    if (!users.length) {
      return { error: 'No users found' }
    }
    return users
  } catch (err) {
    return { error: err.message }
  }
}
