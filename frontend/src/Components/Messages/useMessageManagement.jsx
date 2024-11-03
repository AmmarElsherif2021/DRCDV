import { useState, useCallback, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useChannel } from '../../contexts/ChannelContext'
import { useSocket } from '../../contexts/SocketContext'

/**
 * Custom hook for managing message creation and updates
 * @param {string} channelId - Current channel identifier
 * @param {string} token - Authentication token
 * @returns {Object} Message management methods and state
 */
export const useMessageManagement = (channelId, token) => {
  const [text, setText] = useState('')
  const [attachments, setAttachments] = useState([])
  const [sending, setSending] = useState(false)
  const [userId, setUserId] = useState(null)
  const socket = useSocket()
  const { channelMembers, channelMessages, setChannelMessages } = useChannel()

  // Decode user ID from token on mount
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUserId(decoded.sub)
      } catch (error) {
        console.error('Invalid token:', error)
      }
    }
  }, [token])

  /**
   * Creates a temporary message object for optimistic updates
   * @param {string} text - Message content
   * @param {Array} attachments - Message attachments
   * @returns {Message} Temporary message object
   */
  const createTempMessage = useCallback(
    (text, attachments) => {
      const tempId = Date.now()
      const currentUser = channelMembers.find((m) => m._id === userId)

      return {
        _id: `temp-${tempId}`,
        text,
        attachments,
        sender: {
          _id: userId,
          username: currentUser?.username || 'You',
          profileImage: currentUser?.profileImage,
        },
        channelId,
        createdAt: new Date().toISOString(),
        pending: true,
        tempId,
      }
    },
    [channelMembers, userId, channelId],
  )

  /**
   * Handles successful message creation response
   */
  const handleMessageCreated = useCallback(
    (msg) => {
      setChannelMessages((prevMessages) => {
        const updatedMessages = prevMessages.filter(
          (m) => !m.pending || m._id !== `temp-${msg.tempId}`,
        )
        return [...updatedMessages, msg]
      })
      setText('')
      setAttachments([])
      setSending(false)
    },
    [setChannelMessages],
  )

  // Setup socket listeners
  useEffect(() => {
    if (socket) {
      socket.on('messageCreated', handleMessageCreated)
      return () => socket.off('messageCreated', handleMessageCreated)
    }
  }, [socket, handleMessageCreated])

  /**
   * Sends a new message through the socket
   * @param {Object} messageData - Message data to send
   */
  const sendMessage = useCallback(
    async (messageData) => {
      if (!socket || !userId || sending) return

      const tempMessage = createTempMessage(
        messageData.text,
        messageData.attachments,
      )
      setChannelMessages((prev) => [...prev, tempMessage])

      socket.emit('createMessage', {
        userId,
        channelId,
        messageData: {
          ...messageData,
          tempId: tempMessage.tempId,
        },
      })

      setSending(true)
    },
    [socket, userId, channelId, sending, createTempMessage, setChannelMessages],
  )

  return {
    text,
    setText,
    attachments,
    setAttachments,
    sending,
    sendMessage,
  }
}
