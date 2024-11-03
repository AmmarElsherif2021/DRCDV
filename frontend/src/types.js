/**
 * @typedef {Object} MessageAttachment
 * @property {string} filename - Name of the attached file
 * @property {string} contentType - MIME type of the attachment
 * @property {string} data - Base64 encoded file data
 */

/**
 * @typedef {Object} Message
 * @property {string} _id - Unique message identifier
 * @property {string} text - Message content
 * @property {MessageAttachment[]} attachments - Array of file attachments
 * @property {Object} sender - Message sender information
 * @property {string} channelId - Channel identifier
 * @property {string} createdAt - Message creation timestamp
 * @property {boolean} [pending] - Indicates if message is pending confirmation
 * @property {string} [tempId] - Temporary ID for pending messages
 */
