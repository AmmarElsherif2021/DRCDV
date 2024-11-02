import { useEffect, useCallback } from 'react'
import { useSocket } from '../../contexts/SocketContext'
import { useChannel } from '../../contexts/ChannelContext'

export const useRealTimeMessages = (channelId) => {
  const socket = useSocket()
  const { channelMessages, setChannelMessages } = useChannel()

  // Handle new message from socket
  const handleNewMessage = useCallback(
    (message) => {
      setChannelMessages((prevMessages) => {
        // Remove any temporary version of this message
        const filteredMessages = prevMessages.filter(
          (m) => m._id !== `temp-${message.tempId}` && m._id !== message._id,
        )
        return [...filteredMessages, message]
      })
    },
    [setChannelMessages],
  )

  // Handle message update from socket
  const handleMessageUpdate = useCallback(
    (updatedMessage) => {
      setChannelMessages((prevMessages) => {
        return prevMessages.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg,
        )
      })
    },
    [setChannelMessages],
  )

  // Handle message deletion from socket
  const handleMessageDelete = useCallback(
    (messageId) => {
      setChannelMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId),
      )
    },
    [setChannelMessages],
  )

  // Handle pending message confirmation
  const handleMessageConfirmation = useCallback(
    (msg) => {
      setChannelMessages((prevMessages) => {
        // Remove temporary message and add confirmed message
        const filteredMessages = prevMessages.filter(
          (m) => m._id !== `temp-${msg.tempId}`,
        )
        return [...filteredMessages, msg]
      })
    },
    [setChannelMessages],
  )

  // Socket event subscriptions
  useEffect(() => {
    if (!socket || !channelId) return

    socket.emit('join-channel', channelId)

    socket.on(`message:new:${channelId}`, handleNewMessage)
    socket.on(`message:update:${channelId}`, handleMessageUpdate)
    socket.on(`message:delete:${channelId}`, handleMessageDelete)
    socket.on('messageCreated', handleMessageConfirmation)

    return () => {
      socket.off(`message:new:${channelId}`)
      socket.off(`message:update:${channelId}`)
      socket.off(`message:delete:${channelId}`)
      socket.off('messageCreated')
      socket.emit('leave-channel', channelId)
    }
  }, [
    socket,
    channelId,
    handleNewMessage,
    handleMessageUpdate,
    handleMessageDelete,
    handleMessageConfirmation,
  ])

  return {
    messages: channelMessages,
  }
}
