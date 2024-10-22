// Import statements
import { Message } from '../db/models/message.js'
import { User } from '../db/models/user.js'
import { Buffer } from 'buffer'
import { Channel } from '../db/models/channel.js'
import { parse } from 'csv-parse/sync'
import * as d3 from 'd3'
import * as XLSX from 'xlsx'

// =======================================
// Message CRUD Operations
// =======================================

/**
 * Creates a new message with optional attachments
 * param: {string} userId - The ID of the message sender
 * param: {string} channelId - The ID of the channel
 * param: params - Message parameters
 * param: {string} params.text - Message content
 * param: {Array} params.attachments - Optional file attachments
 * returns: {Promise<Message>} Created message
 */
export async function createMessage(
  userId,
  channelId,
  { text, attachments = [] },
) {
  try {
    console.log('Processing attachments for new message')

    const formattedAttachments = attachments.map((attachment) => {
      console.log('Processing attachment with type:', attachment.contentType)

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

    console.log(`Processed ${formattedAttachments.length} attachments`)

    const message = new Message({
      text,
      attachments: formattedAttachments,
      sender: userId,
      channel: channelId,
    })

    const savedMessage = await message.save()
    console.log(`Successfully created message with ID: ${savedMessage._id}`)
    return savedMessage
  } catch (error) {
    console.error('Error creating message:', error)
    throw error
  }
}
/**
 * Retrieves a message by its ID
 * param: {string} messageId - The ID of the message to retrieve
 * returns: {Promise<Message>} Found message with populated sender
 */
export async function getMessageById(messageId) {
  try {
    return await Message.findById(messageId).populate('sender', 'username')
  } catch (error) {
    console.error('Error getting message by id:', error)
    throw error
  }
}

/**
 * Updates a message's text content
 * param: {string} userId - The ID of the message sender
 * param: {string} messageId - The ID of the message to update
 * param: params - Update parameters
 * param: {string} params.text - New message content
 * returns: {Promise<Message>} Updated message
 */
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

/**
 * Deletes a message
 * param: {string} userId - The ID of the message sender
 * param: {string} messageId - The ID of the message to delete
 * returns: {Promise<Object>} Deletion result
 */
export async function deleteMessage(userId, messageId) {
  try {
    return await Message.deleteOne({ _id: messageId, sender: userId })
  } catch (error) {
    console.error('Error deleting message:', error)
    throw error
  }
}

// =======================================
// Message Listing Operations
// =======================================

/**
 * Base function for listing messages with optional query and sorting
 * param: query - MongoDB query object
 * param: options - Sorting options
 * returns: {Promise<Array<Message>>} List of messages
 */
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

/**
 * Lists all messages with optional sorting
 * param: options - Sorting options
 * returns: {Promise<Array<Message>>} All messages
 */
export async function listAllMessages(options) {
  return await listMessages({}, options)
}

/**
 * Lists messages filtered by tags
 * param: {Array<string>} tags - Tags to filter by
 * param: options - Sorting options
 * returns: {Promise<Array<Message>>} Filtered messages
 */
export async function listMessagesByTag(tags, options) {
  return await listMessages({ tags }, options)
}

/**
 * Lists messages by author username
 * param: {string} authorUsername - Username of the author
 * param: options - Sorting options
 * returns: {Promise<Array<Message>>} Author's messages
 */
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

/**
 * Gets messages for a specific channel with pagination and sorting
 * param: {string} channelId - The ID of the channel
 * param: options - Query options
 * returns: {Promise<Array<Message>>} Channel messages
 */
export async function getMessagesByChannelId(channelId, options = {}) {
  const { limit = 300, sortBy = 'createdAt', sortOrder = 'asc' } = options
  try {
    console.log(`Attempting to fetch messages for channel: ${channelId}`)
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

// =======================================
// Attachment Processing Utilities
// =======================================

/**
 * Processes CSV attachments and converts them to chart data
 * param: attachment - CSV attachment object
 * returns: Processed attachment with chart data
 */
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

/**
 * Processes Excel attachments and converts them to chart data
 * param: attachment - Excel attachment object
 * returns: Processed attachment with chart data
 */
function processExcelAttachment(attachment) {
  try {
    // Ensure we're working with a Buffer
    const buffer = Buffer.isBuffer(attachment.data)
      ? attachment.data
      : Buffer.from(attachment.data, 'base64')

    // Read the workbook
    const workbook = XLSX.read(buffer, { type: 'buffer' })

    // Validate workbook has sheets
    if (!workbook.SheetNames.length) {
      throw new Error('Excel file contains no sheets')
    }

    // Get first sheet
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]

    // Convert sheet to JSON with headers in first row
    const jsonData = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      raw: false, // Convert all cells to strings
      defval: '', // Use empty string for empty cells
    })

    // Validate we have data
    if (!Array.isArray(jsonData) || jsonData.length < 2) {
      // Need at least headers + 1 data row
      throw new Error('Excel file contains insufficient data')
    }

    // Extract headers and data
    const headers = jsonData[0].map((header) =>
      header ? header.toString().trim() : '',
    )

    // Process all rows after header
    const values = jsonData.slice(1).map((row) =>
      row.map((cell) => {
        if (cell === null || cell === undefined || cell === '') {
          return 0 // Convert empty/null values to 0 for numerical data
        }
        const num = Number(cell)
        return isNaN(num) ? cell.toString().trim() : num
      }),
    )

    // Filter out completely empty rows
    const filteredValues = values.filter((row) =>
      row.some((cell) => cell !== 0 && cell !== ''),
    )

    // Validate we have valid headers and data
    if (!headers.some((h) => h !== '')) {
      throw new Error('No valid headers found in Excel file')
    }

    if (!filteredValues.length) {
      throw new Error('No valid data rows found in Excel file')
    }

    // Return processed attachment
    return {
      ...attachment,
      data: buffer.toString('base64'),
      chartData: {
        labels: headers,
        values: filteredValues,
      },
    }
  } catch (error) {
    console.error('Error processing Excel attachment:', error)
    return {
      ...attachment,
      data: Buffer.isBuffer(attachment.data)
        ? attachment.data.toString('base64')
        : attachment.data,
      chartData: {
        labels: [],
        values: [],
      },
      parseError: error.message,
    }
  }
}
/**
 * Formats a message by processing its attachments
 * param: message - Message object to format
 * returns: Formatted message with processed attachments
 */
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
          if (!att.data) {
            throw new Error('Attachment data is missing')
          }

          let parsedData
          if (att.contentType === 'text/csv') {
            parsedData = processCsvData(att.data)
          } else {
            parsedData = processExcelData(
              Buffer.isBuffer(att.data)
                ? att.data
                : Buffer.from(att.data, 'base64'),
            )
          }
          console.log(
            `parsed data  from formatMessage fn ${JSON.stringify(parsedData)}`,
          ) //Debugggggggggggggggggggggggggggggggggggggggg after processing data
          if (!parsedData || !parsedData.labels || !parsedData.values) {
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
          return {
            ...att,
            data: att.data ? att.data.toString('base64') : '',
            chartData: { labels: [], values: [] },
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

/**
 * Processes raw CSV data into chart format
 * param: {Buffer} data - Raw CSV data
 * returns: Processed chart data
 */
function processCsvData(data) {
  const csvData = d3.csvParse(data.toString())
  if (!Array.isArray(csvData) || csvData.length === 0) {
    throw new Error('CSV parsing resulted in empty or invalid data')
  }
  const labels = Object.keys(csvData[0])
  const values = csvData.map((row) => Object.values(row).map(Number))
  return { labels, values }
}

/**
 * Processes raw Excel data into chart format
 * param: {Buffer} data - Raw Excel data
 * returns: Processed chart data
 */
function processExcelData(data) {
  try {
    const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data, 'base64')
    const workbook = XLSX.read(buffer, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]

    if (!sheetName) {
      throw new Error('No sheets found in Excel file')
    }

    const sheet = workbook.Sheets[sheetName]
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 })

    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      throw new Error('Excel parsing resulted in empty data')
    }

    const headers = jsonData[0].map((header) =>
      header ? header.toString() : '',
    )
    const values = jsonData.slice(1).map((row) =>
      row.map((cell) => {
        if (cell === null || cell === undefined) return ''
        const num = Number(cell)
        return isNaN(num) ? cell.toString() : num
      }),
    )

    if (headers.length === 0) {
      throw new Error('No headers found in Excel file')
    }

    return {
      labels: headers,
      values: values,
      //chartType: 'bar',
    }
  } catch (error) {
    console.error('Error processing Excel data:', error)
    throw new Error('Excel parsing resulted in empty or invalid data')
  }
}
