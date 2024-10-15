import {
  createUser,
  loginUser,
  getUserInfoById,
  getUsers,
} from '../services/users.js'

export function usersRoutes(app) {
  app.post('/api/v1/user/signup', async (req, res) => {
    try {
      const user = await createUser(req.body)
      console.log('Request Body:', req.body) // Debugging log
      return res.status(201).json({ username: user.username })
    } catch (err) {
      return res.status(400).json({
        error: 'Failed to create the user, does the username already exist?',
      })
    }
  })

  app.post('/api/v1/user/login', async (req, res) => {
    try {
      const token = await loginUser(req.body)
      return res.status(200).send({ token })
    } catch (err) {
      return res.status(400).send({
        error: 'Login failed, did you enter the correct username/password?',
      })
    }
  })
  // get user by id route
  app.get('/api/v1/users/:id', async (req, res) => {
    try {
      const userInfo = await getUserInfoById(req.params.id)
      return res.status(200).send(userInfo)
    } catch (err) {
      return res.status(400).send({
        error: 'Failed to fetch user information.',
      })
    }
  })

  // get all users route
  app.get('/api/v1/users', async (req, res) => {
    try {
      const usersInfo = await getUsers()
      return res.status(200).send(usersInfo)
    } catch (err) {
      return res.status(400).send({
        error: 'Failed to fetch users.',
      })
    }
  })
}
