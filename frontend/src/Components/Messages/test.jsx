import React, { useMemo, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useChannel } from '../../contexts/ChannelContext'
import { Avatar } from './Avatar'
import EnhancedAttachment from './DataVisuals'
import { User } from 'lucide-react'

export const Message = React.memo(({ message, currentUserId }) => {
  const { channelMembers, fetchUserAvatar, userAvatars, loadingAvatars } =
    useChannel()

  // Resolve message sender and get the correct user ID
  const sender = useMemo(() => {
    const senderMember = channelMembers.find(
      (m) => String(m.user) === String(message.sender._id),
    )
    return senderMember || message.sender
  }, [message.sender._id, channelMembers])

  // Use the user field from channelMembers, fallback to sender._id
  const senderId = sender.user || sender._id

  const isCurrentUser = String(senderId) === String(currentUserId)

  // Debug logging
  useEffect(() => {
    console.log('Message component:', {
      messageId: message._id,
      senderId,
      senderMemberId: sender._id,
      senderUserId: sender.user,
      hasAvatar: !!userAvatars[senderId],
      isLoading: !!loadingAvatars[senderId],
    })
  }, [message._id, sender, senderId, userAvatars, loadingAvatars])

  // Fetch avatar if not already loaded
  useEffect(() => {
    if (senderId && !userAvatars[senderId] && !loadingAvatars[senderId]) {
      console.log('Fetching avatar for user:', senderId)
      fetchUserAvatar(senderId)
    }
  }, [senderId, fetchUserAvatar, userAvatars, loadingAvatars])

  const messageStyle = useMemo(
    () => ({
      backgroundColor: isCurrentUser ? '#1CCB8F' : 'black',
      color: isCurrentUser ? 'black' : 'white',
      opacity: message.pending ? 0.7 : 1,
      transform: message.pending ? 'scale(0.98)' : 'scale(1)',
      padding: '0.75rem 0.75rem',
      borderRadius: '1rem',
      width: '100%',
      transition: 'all 0.2s ease-in-out',
      wordBreak: 'break-word',
    }),
    [isCurrentUser, message.pending],
  )

  return (
    <ListGroup.Item
      className={`d-flex ${isCurrentUser ? 'justify-content-end' : 'justify-content-start'} border-0 bg-transparent py-2`}
    >
      <MessageContent
        message={message}
        sender={sender}
        senderId={senderId}
        isCurrentUser={isCurrentUser}
        style={messageStyle}
        avatarData={userAvatars[senderId]}
        isLoadingAvatar={loadingAvatars[senderId]}
      />
    </ListGroup.Item>
  )
})
