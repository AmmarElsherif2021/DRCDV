import { Message } from '../db/models/message.js'
import { User } from '../db/models/user.js'
import { Buffer } from 'buffer'
// Create Message
// Create Message with Binary Data
export async function createMessage(
  userId,
  channelId,
  { text, attachments = [] },
) {
  try {
    const message = new Message({
      text,
      attachments,
      sender: userId,
      channel: channelId,
    })

    return await message.save()
  } catch (error) {
    console.error('Error creating message:', error)
    throw error
  }
}
export async function getMessagesByChannelId(channelId, options = {}) {
  try {
    const messages = await listMessages({ channel: channelId }, options)
    const formattedMessages = messages.map((message) => ({
      ...message._doc,
      attachments: message.attachments.map((att) => ({
        ...att._doc,
        data: att.data ? Buffer.from(att.data).toString('base64') : '', // Ensure encoding to base64
      })),
    }))
    return formattedMessages
  } catch (error) {
    console.error('Error getting messages by channel ID:', error)
    throw error
  }
}

// Get Message by id
export async function getMessageById(messageId) {
  try {
    return await Message.findById(messageId).populate('sender', 'username')
  } catch (error) {
    console.error('Error getting message by id:', error)
    throw error
  }
}

// Update Message
export async function updateMessage(userId, messageId, { text }) {
  try {
    return await Message.findOneAndUpdate(
      { _id: messageId, sender: userId },
      { $set: { text } },
      { new: true },
    )
  } catch (error) {
    console.error('Error updating message:', error)
    throw error
  }
}

// Delete Message
export async function deleteMessage(userId, messageId) {
  try {
    return await Message.deleteOne({ _id: messageId, sender: userId })
  } catch (error) {
    console.error('Error deleting message:', error)
    throw error
  }
}

async function listMessages(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  try {
    return await Message.find(query).sort({ [sortBy]: sortOrder })
  } catch (error) {
    console.error('Error listing messages:', error)
    throw error
  }
}

// Customize listing Messages
export async function listAllMessages(options) {
  return await listMessages({}, options)
}

// Customize listing Message query to tags
export async function listMessagesByTag(tags, options) {
  return await listMessages({ tags }, options)
}

// List by author
export async function listMessagesByAuthor(authorUsername, options) {
  try {
    const user = await User.findOne({ username: authorUsername })
    if (!user) return []
    return await listMessages({ sender: user._id }, options)
  } catch (error) {
    console.error('Error listing messages by author:', error)
    throw error
  }
}
