import {
  createUser,
  loginUser,
  getUserInfoById,
  getUsers,
} from '../services/users.js'
export function usersRoutes(app) {
  //create user route

  app.post('/api/v1/user/signup', async (req, res) => {
    try {
      const user = await createUser(req.body)
      return res.status(201).json({ username: user.username })
    } catch (err) {
      return res.status(400).json({
        error: 'failed to create the user, does the username already exist?',
      })
    }
  })

  //login route
  app.post('/api/v1/user/login', async (req, res) => {
    try {
      // define token based on req.body
      const token = await loginUser(req.body)
      //return token
      //console.log(`req body : ${JSON.stringify(req.body)}`) // Fatal
      return res.status(200).send({ token })
    } catch (err) {
      return res.status(400).send({
        error: 'login failed, did you enter the correct username/password?',
      })
    }
  })

  //get user by id route..
  app.get('/api/v1/users/:id', async (req, res) => {
    const userInfo = await getUserInfoById(req.params.id)
    return res.status(200).send(userInfo)
  })

  //get users by id route..
  app.get('/api/v1/users', async (req, res) => {
    const usersInfo = await getUsers()
    return res.status(200).send(usersInfo)
  })
}
