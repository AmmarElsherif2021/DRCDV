import { requireAuth } from '../middleware/jwt.js'
import {
  createChannel,
  listChannels,
  addMemberToChannel,
  getChannelById,
  checkChannelExists,
} from '../services/channels.js'

export function channelsRoutes(app) {
  // List channels where the user is a member
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

  // Add member to channel route
  app.post('/api/v1/channels/:cid/members', requireAuth, async (req, res) => {
    const { cid } = req.params
    const newMember = req.body.newMember
    try {
      const channel = await addMemberToChannel(req.auth.sub, cid, newMember)
      return res.status(200).json(channel)
    } catch (err) {
      console.error('Error adding member to channel:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  })

  // Check if channel exists
  app.get('/api/v1/channels/check', async (req, res) => {
    const { userId1, userId2 } = req.query
    if (!userId1 || !userId2) {
      return res.status(400).json({ error: 'User IDs are required' })
    }
    try {
      const channelId = await checkChannelExists(userId1, userId2)
      return res.json({ exists: !!channelId, channelId })
    } catch (err) {
      console.error('Error checking channel:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  })
}
