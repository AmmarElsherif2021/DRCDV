import { requireAuth } from '../middleware/jwt.js'
import { createChannel, listChannels } from '../services/channels.js'

//List channels
export function channelsRoutes(app) {
  app.get('/api/v1/:id/channels', async (req, res) => {
    const { sortBy, sortOrder } = req.query
    const options = { sortBy, sortOrder }
    try {
      return res.json(await listChannels({}, options))
    } catch (err) {
      console.error('Error listing channels' + err)
      return res.status(500).json({ error: 'internal server err' })
    }
  })

  //channel creation route
  app.post('/api/v1/:id/channels', requireAuth, async (req, res) => {
    try {
      const channel = await createChannel(req.auth.sub, req.body)
      return res.json(channel)
    } catch (err) {
      console.error('Error creating channel', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  })
}
