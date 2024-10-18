import multer from 'multer'
import { requireAuth } from '../middleware/jwt.js'
import {
  listAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
} from '../services/messages.js'
import { getMessagesByChannelId } from '../services/messages.js'

// Set up Multer for file uploads
const storage = multer.memoryStorage() // Use in-memory storage for simplicity
const upload = multer({ storage })

// List messages route
export function messagesRoutes(app) {
  app.get('/api/v1/:cid/messages', async (req, res) => {
    const { sortBy, sortOrder } = req.query
    const options = { sortBy, sortOrder }
    try {
      const messages = await listAllMessages(req.params.cid, options)
      return res.json(messages)
    } catch (err) {
      console.error('error listing messages', err)
      return res.status(500).json({ error: 'Error listing messages' })
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

  // Get messages by channel ID
  app.get('/api/v1/channels/:cid/messages', async (req, res) => {
    const { sortBy, sortOrder } = req.query
    const options = { sortBy, sortOrder }
    try {
      const messages = await getMessagesByChannelId(req.params.cid, options)
      return res.json(messages)
    } catch (err) {
      console.error('Error listing messages:', err)
      return res.status(500).json({ error: 'Error listing messages' })
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
