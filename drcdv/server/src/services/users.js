import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../db/models/user.js'

//create new user function
export async function createUser({ username, password }) {
  // hash password before storing in db
  const hashedPassword = await bcrypt.hash(password, 10)
  //define user
  const user = new User({ username, password: hashedPassword })
  //save the user in db
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
    return { username: user.username }
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
