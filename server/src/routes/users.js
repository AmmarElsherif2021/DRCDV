import {
  createUser,
  loginUser,
  getUserInfoById,
  getUsers,
} from '../services/users.js'
import multer from 'multer'
import sharp from 'sharp'
import { User } from '../db/models/user.js' // Ensure this import is present

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image file'))
    }
    cb(undefined, true)
  },
})

export function usersRoutes(app) {
  app.post(
    '/api/v1/user/signup',
    upload.single('profileImage'),
    async (req, res) => {
      try {
        let imageData
        if (req.file) {
          // Resize and optimize image
          imageData = await sharp(req.file.buffer)
            .resize(300, 300, { fit: 'cover' })
            .jpeg({ quality: 90 })
            .toBuffer()
        }

        const userData = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        }

        if (imageData) {
          userData.profileImage = {
            data: imageData,
            contentType: 'image/jpeg',
          }
        }

        const user = await createUser(userData)
        return res.status(201).json({ username: user.username })
      } catch (err) {
        console.error(err)
        return res.status(400).json({
          error: 'Failed to create the user',
        })
      }
    },
  )

  // route to serve profile images
  app.get('/api/v1/users/:id/profile-image', async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      if (!user || !user.profileImage) {
        return res.status(404).send()
      }
      res.set('Content-Type', user.profileImage.contentType)
      res.send(user.profileImage.data)
    } catch (err) {
      console.error(err)
      res.status(400).send()
    }
  })

  app.post('/api/v1/user/login', async (req, res) => {
    try {
      const token = await loginUser(req.body)
      return res.status(200).send({ token })
    } catch (err) {
      console.error(err)
      return res.status(400).send({
        error: 'Login failed, did you enter the correct username/password?',
      })
    }
  })

  // Get user by ID route
  app.get('/api/v1/users/:id', async (req, res) => {
    try {
      const userInfo = await getUserInfoById(req.params.id)
      return res.status(200).send(userInfo)
    } catch (err) {
      console.error(err)
      return res.status(400).send({
        error: 'Failed to fetch user information.',
      })
    }
  })

  // Get all users route
  app.get('/api/v1/users', async (req, res) => {
    try {
      const usersInfo = await getUsers()
      return res.status(200).send(usersInfo)
    } catch (err) {
      console.error(err)
      return res.status(400).send({
        error: 'Failed to fetch users.',
      })
    }
  })
}
