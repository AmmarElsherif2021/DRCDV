import multer from 'multer'
import { requireAuth } from '../middleware/jwt.js'
import {
  getMessagesByChannelId,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
} from '../services/messages.js'
import { Channel } from '../db/models/channel.js' // Ensure this import path is correct

// Set up Multer for file uploads
const storage = multer.memoryStorage() // Use in-memory storage for simplicity
const upload = multer({ storage })

export function messagesRoutes(app) {
  // Get messages by channel ID
  app.get('/api/v1/channels/:cid/messages', requireAuth, async (req, res) => {
    const { cid } = req.params
    const { limit = 50, sortBy = 'createdAt', sortOrder = 'desc' } = req.query
    console.log(`Received request for messages in channel: ${cid}`)
    console.log(
      `Query params: limit=${limit}, sortBy=${sortBy}, sortOrder=${sortOrder}`,
    )
    console.log(`Auth token: ${req.headers.authorization?.substring(0, 20)}...`)

    try {
      // Check if the channel exists
      const channelExists = await Channel.exists({ _id: cid })
      if (!channelExists) {
        console.log(`Channel not found: ${cid}`)
        return res.status(404).json({ error: 'Channel not found' })
      }

      console.log(`Channel ${cid} exists, fetching messages`)
      const messages = await getMessagesByChannelId(cid, {
        limit: parseInt(limit),
        sortBy,
        sortOrder,
      })
      console.log(`Fetched ${messages.length} messages for channel ${cid}`)
      return res.json(messages)
    } catch (err) {
      console.error('Error listing messages:', err)
      if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({ error: 'Invalid channel ID format' })
      }
      return res
        .status(500)
        .json({ error: 'Error listing messages', details: err.message })
    }
  })

  // Find specific message route
  app.get('/api/v1/:cid/messages/:id', async (req, res) => {
    const { id, cid } = req.params
    try {
      const message = await getMessageById(cid, id)
      if (!message) return res.status(404).json({ error: 'Message not found' })
      return res.json(message)
    } catch (err) {
      console.error('error getting message', err)
      return res.status(500).json({ error: 'Error getting message' })
    }
  })

  // Create message with attachment
  app.post(
    '/api/v1/:cid/messages',
    requireAuth,
    upload.array('attachments'),
    async (req, res) => {
      const attachments = req.files.map((file) => ({
        filename: file.originalname,
        contentType: file.mimetype,
        data: file.buffer,
      }))
      const { text } = req.body
      try {
        const message = await createMessage(req.auth.sub, req.params.cid, {
          text,
          attachments,
        })
        return res.status(201).json(message)
      } catch (err) {
        console.error('error creating message', err)
        return res.status(500).json({ error: 'Error creating message' })
      }
    },
  )

  // Find and update message route
  app.patch('/api/v1/:cid/messages/:id', requireAuth, async (req, res) => {
    try {
      const message = await updateMessage(req.auth.sub, req.params.id, req.body)
      if (!message) return res.status(404).json({ error: 'Message not found' })
      return res.json(message)
    } catch (err) {
      console.error('error updating message', err)
      return res.status(500).json({ error: 'Error updating message' })
    }
  })

  // Find and delete message route
  app.delete('/api/v1/:cid/messages/:id', requireAuth, async (req, res) => {
    try {
      const { deletedCount } = await deleteMessage(req.auth.sub, req.params.id)
      if (deletedCount === 0)
        return res.status(404).json({ error: 'Message not found' })
      return res.status(204).end()
    } catch (err) {
      console.error('error deleting message', err)
      return res.status(500).json({ error: 'Error deleting message' })
    }
  })

  // Upload file route (if needed)
  app.post('/upload', upload.single('file'), (req, res) => {
    const { file } = req
    if (!file) {
      return res.status(400).send('No file uploaded')
    }
    res.send({ file })
  })
}
