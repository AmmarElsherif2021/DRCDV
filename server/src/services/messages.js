import { Message } from '../db/models/message.js'
import { User } from '../db/models/user.js'
import { Buffer } from 'buffer'
import { Channel } from '../db/models/channel.js'
import { parse } from 'csv-parse/sync'

// Create Message with Binary Data
export async function createMessage(
  userId,
  channelId,
  { text, attachments = [] },
) {
  try {
    const formattedAttachments = attachments.map((attachment) => {
      if (attachment.contentType === 'text/csv') {
        try {
          console.log('Processing CSV attachment:', attachment)

          if (!attachment.data) {
            console.error('CSV attachment data is missing')
            throw new Error('CSV attachment data is missing')
          }

          // Parse CSV data
          const parsedData = parse(attachment.data, {
            columns: true,
            skip_empty_lines: true,
          })

          console.log('Parsed CSV data:', parsedData)

          // Check if parsedData is empty or not an array
          if (!Array.isArray(parsedData) || parsedData.length === 0) {
            console.warn('CSV parsing resulted in empty or invalid data')
            return {
              ...attachment,
              data: Buffer.from(attachment.data, 'base64'),
              chartData: { labels: [], values: [] },
            }
          }

          // Extract labels and values
          const labels = Object.keys(parsedData[0])
          const values = parsedData.map((row) => Object.values(row))

          console.log('Extracted labels:', labels)
          console.log('Extracted values (first row):', values[0])

          if (labels.length === 0) {
            console.error('CSV has no columns')
            throw new Error('CSV has no columns')
          }

          return {
            ...attachment,
            data: Buffer.from(JSON.stringify({ labels, values })),
            chartData: { labels, values },
          }
        } catch (csvError) {
          console.error('Error processing CSV attachment:', csvError)
          return {
            ...attachment,
            data: Buffer.from(attachment.data, 'base64'),
            chartData: { labels: [], values: [] },
            parseError: csvError.message,
          }
        }
      }
      return {
        ...attachment,
        data: Buffer.from(attachment.data, 'base64'),
      }
    })

    const message = new Message({
      text,
      attachments: formattedAttachments,
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
  const { limit = 300, sortBy = 'createdAt', sortOrder = 'asc' } = options
  try {
    console.log(`Attempting to fetch messages for channel: ${channelId}`)
    // Check if the channel exists
    const channelExists = await Channel.exists({ _id: channelId })
    if (!channelExists) {
      console.error(`Channel not found: ${channelId}`)
      throw new Error('Channel not found')
    }

    const messages = await Message.find({ channel: channelId })
      .sort({ [sortBy]: sortOrder })
      .limit(parseInt(limit))
      .populate('sender', 'username')
      .lean()

    console.log(`Found ${messages.length} messages for channel ${channelId}`)
    return messages.map(formatMessage)
  } catch (error) {
    console.error('Error getting messages by channel ID:', error)
    throw error
  }
}

function formatMessage(message) {
  return {
    ...message,
    attachments: message.attachments.map((att) => {
      if (att.contentType === 'text/csv') {
        try {
          console.log('Processing CSV attachment:', att)

          if (!att.data) {
            console.error('CSV attachment data is missing')
            throw new Error('CSV attachment data is missing')
          }

          console.log(
            'CSV data (first 100 chars):',
            att.data.toString().substring(0, 100),
          )

          const parsedCSV = parse(att.data.toString(), {
            columns: true,
            skip_empty_lines: true,
          })

          console.log(
            'Parsed CSV:',
            JSON.stringify(parsedCSV).substring(0, 200),
          )

          if (!parsedCSV || parsedCSV.length === 0) {
            console.error('Parsed CSV is empty')
            throw new Error('Parsed CSV is empty')
          }

          const labels = Object.keys(parsedCSV[0])
          console.log('CSV labels:', labels)

          const values = parsedCSV.map((row) => Object.values(row))
          console.log('CSV values (first row):', values[0])

          if (labels.length === 0) {
            console.error('CSV has no columns')
            throw new Error('CSV has no columns')
          }

          return {
            ...att,
            data: att.data.toString('base64'),
            chartData: { labels, values },
            isImage: false,
          }
        } catch (error) {
          console.error('Error parsing CSV attachment data:', error)
          console.error('Error stack:', error.stack)
          return {
            ...att,
            data: att.data ? att.data.toString('base64') : '',
            chartData: null,
            isImage: false,
            parseError: error.message,
          }
        }
      }
      return {
        ...att,
        data: att.data ? att.data.toString('base64') : '',
        isImage: att.contentType && att.contentType.startsWith('image/'),
      }
    }),
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
