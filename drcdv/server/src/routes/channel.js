import { requireAuth } from '../middleware/jwt.js'
import {
  createChannel,
  listChannels,
  updateChannel,
  getChannelById,
  deleteChannel,
} from '../services/channels.js'

// List channels where the user is a member
export function channelsRoutes(app) {
  app.get('/api/v1/channels', async (req, res) => {
    const { userId, sortBy, sortOrder } = req.query
    const options = { sortBy, sortOrder }

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    try {
      const channels = await listChannels({ 'members.user': userId }, options)
      return res.json(channels)
    } catch (err) {
      console.error('Error listing channels:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  })

  // Channel creation route
  app.post('/api/v1/channels', requireAuth, async (req, res) => {
    try {
      const channel = await createChannel(req.auth.sub, req.body)
      return res.status(201).json(channel)
    } catch (err) {
      console.error('Error creating channel:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  })

  // Find specific channel route
  app.get('/api/v1/channels/:cid', requireAuth, async (req, res) => {
    const { cid } = req.params
    try {
      const channel = await getChannelById(cid)
      if (
        !channel ||
        !channel.members.some((member) => member.user.equals(req.auth.sub))
      ) {
        return res
          .status(404)
          .json({ error: 'Channel not found or access denied' })
      }
      return res.json(channel)
    } catch (err) {
      console.error('Error getting channel:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  })

  // Update specific channel route
  app.patch('/api/v1/channels/:cid', requireAuth, async (req, res) => {
    const { cid } = req.params
    try {
      const channel = await updateChannel(cid, req.auth.sub, req.body)
      if (!channel) return res.status(404).json({ error: 'Channel not found' })
      return res.json(channel)
    } catch (err) {
      console.error('Error updating channel:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  })

  // Delete specific channel route
  app.delete('/api/v1/channels/:cid', requireAuth, async (req, res) => {
    const { cid } = req.params
    try {
      const result = await deleteChannel(cid, req.auth.sub)
      if (result.deletedCount === 0)
        return res.status(404).json({ error: 'Channel not found' })
      return res.status(204).end()
    } catch (err) {
      console.error('Error deleting channel:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  })
}
