import {
  createMessage,
  getMessageById,
  updateMessage,
  deleteMessage,
  listAllMessages,
  listMessagesByTag,
  listMessagesByAuthor,
} from '../services/messages.js'

export function socketHandlers(io) {
  const messageCache = new Set()
  io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('createMessage', async (data) => {
      const { userId, channelId, messageData } = data

      // Check if this message was recently processed
      const messageKey = `${messageData.id}-${userId}-${channelId}`
      if (messageCache.has(messageKey)) {
        return // Skip if message was recently processed
      }

      try {
        messageCache.add(messageKey)
        // Remove from cache after 5 seconds
        setTimeout(() => messageCache.delete(messageKey), 5000)

        const message = await createMessage(userId, channelId, messageData)

        // Emit to all clients in one go, including sender
        io.emit('messageCreated', message)
      } catch (error) {
        console.error('Error creating message:', error)
        socket.emit('error', 'Error processing message')
        messageCache.delete(messageKey)
      }
    })

    socket.on('getMessageById', async (messageId) => {
      try {
        const message = await getMessageById(messageId)
        socket.emit('messageFetched', message)
      } catch (error) {
        socket.emit('error', 'Error getting message by id')
      }
    })

    socket.on('updateMessage', async (data) => {
      const { userId, messageId, newText } = data
      try {
        const updatedMessage = await updateMessage(userId, messageId, {
          text: newText,
        })
        io.emit('messageUpdated', updatedMessage) // Broadcast to all clients
      } catch (error) {
        socket.emit('error', 'Error updating message')
      }
    })

    socket.on('deleteMessage', async (data) => {
      const { userId, messageId } = data
      try {
        const result = await deleteMessage(userId, messageId)
        io.emit('messageDeleted', result) // Broadcast to all clients
      } catch (error) {
        socket.emit('error', 'Error deleting message')
      }
    })

    socket.on('listAllMessages', async (options) => {
      try {
        const messages = await listAllMessages(options)
        socket.emit('messagesListed', messages)
      } catch (error) {
        socket.emit('error', 'Error listing all messages')
      }
    })

    socket.on('listMessagesByTag', async (data) => {
      const { tags, options } = data
      try {
        const messages = await listMessagesByTag(tags, options)
        socket.emit('messagesListedByTag', messages)
      } catch (error) {
        socket.emit('error', 'Error listing messages by tag')
      }
    })

    socket.on('listMessagesByAuthor', async (data) => {
      const { authorUsername, options } = data
      try {
        const messages = await listMessagesByAuthor(authorUsername, options)
        socket.emit('messagesListedByAuthor', messages)
      } catch (error) {
        socket.emit('error', 'Error listing messages by author')
      }
    })

    socket.on('disconnect', () => {
      console.log('A user disconnected')
    })
  })
}
