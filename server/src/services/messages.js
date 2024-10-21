import { Message } from '../db/models/message.js'
import { User } from '../db/models/user.js'
import { Buffer } from 'buffer'
import { Channel } from '../db/models/channel.js'
import { parse } from 'csv-parse/sync'
import * as d3 from 'd3'
import * as XLSX from 'xlsx'

export async function createMessage(
  userId,
  channelId,
  { text, attachments = [] },
) {
  try {
    const formattedAttachments = attachments.map((attachment) => {
      switch (attachment.contentType) {
        case 'text/csv':
          return processCsvAttachment(attachment)
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          return processExcelAttachment(attachment)
        default:
          return {
            ...attachment,
            data: Buffer.from(attachment.data, 'base64'),
          }
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

function processCsvAttachment(attachment) {
  try {
    const csvData = d3.csvParse(attachment.data.toString())

    if (!Array.isArray(csvData) || csvData.length === 0) {
      throw new Error('CSV parsing resulted in empty or invalid data')
    }

    const labels = Object.keys(csvData[0])
    const values = csvData.map((row) => Object.values(row).map(Number))

    return {
      ...attachment,
      data: Buffer.from(JSON.stringify({ labels, values })),
      chartData: { labels, values, chartType: 'bar' }, // Default to bar chart
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

function processExcelAttachment(attachment) {
  try {
    const workbook = XLSX.read(attachment.data, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json(sheet)

    const labels = Object.keys(data[0])
    const values = data.map((row) => Object.values(row).map(Number))

    return {
      ...attachment,
      data: attachment.data.toString('base64'),
      chartData: { labels, values, chartType: 'bar' },
    }
  } catch (excelError) {
    console.error('Error processing Excel attachment:', excelError)
    return {
      ...attachment,
      data: Buffer.from(attachment.data, 'base64'),
      chartData: { labels: [], values: [] },
      parseError: excelError.message,
    }
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
    return messages.map((x) => formatMessage(x))
  } catch (error) {
    console.error('Error getting messages by channel ID:', error)
    throw error
  }
}
function formatMessage(message) {
  return {
    ...message,
    attachments: message.attachments.map((att) => {
      if (
        att.contentType === 'text/csv' ||
        att.contentType ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        try {
          console.log('Processing attachment:', att)

          if (!att.data) {
            console.error('Attachment data is missing')
            throw new Error('Attachment data is missing')
          }

          let parsedData
          if (att.contentType === 'text/csv') {
            parsedData = processCsvData(att.data)
          } else {
            parsedData = processExcelData(att.data)
          }

          if (!parsedData || !parsedData.labels || !parsedData.values) {
            console.error('Parsed data is invalid')
            throw new Error('Parsed data is invalid')
          }

          return {
            ...att,
            data: att.data.toString('base64'),
            chartData: parsedData,
            isImage: false,
          }
        } catch (error) {
          console.error('Error parsing attachment data:', error)
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

function processCsvData(data) {
  const csvData = d3.csvParse(data.toString())
  if (!Array.isArray(csvData) || csvData.length === 0) {
    throw new Error('CSV parsing resulted in empty or invalid data')
  }
  const labels = Object.keys(csvData[0])
  const values = csvData.map((row) => Object.values(row).map(Number))
  return { labels, values, chartType: 'bar' }
}

function processExcelData(data) {
  const workbook = XLSX.read(data, { type: 'buffer' })
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const jsonData = XLSX.utils.sheet_to_json(sheet)
  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    throw new Error('Excel parsing resulted in empty or invalid data')
  }
  const labels = Object.keys(jsonData[0])
  const values = jsonData.map((row) => Object.values(row).map(Number))
  return { labels, values, chartType: 'bar' }
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
