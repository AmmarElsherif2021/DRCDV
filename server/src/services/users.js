import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../db/models/user.js'

//create new user function
export async function createUser({ username, email, password, profileImage }) {
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

//login user data
export async function loginUser({ username, password }) {
  //search user by username in db
  const user = await User.findOne({ username })

  //1- check username existance
  if (!user) {
    throw new Error('invalid username!')
  }

  //2-check password after encryption
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new Error('invalid password!')
  }

  //create json token: subject - jwt secret - expiration time
  // eslint-disable-next-line no-undef
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })

  //export token
  return token
}

//get user by Id function
export async function getUserInfoById(userId) {
  try {
    const user = await User.findById(userId)
    if (!user) return { username: 'not found' }
    return { username: user.username, email: user.email }
  } catch (err) {
    return { username: userId }
  }
}

//get users function
export async function getUsers() {
  try {
    const users = await User.find()
    if (!users) return { error: 'no users' }
    return users
  } catch (err) {
    return { error: err }
  }
}
