import React, { useMemo } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useChannel } from '../../contexts/ChannelContext'
import { Avatar } from './Avatar'
import EnhancedAttachment from './DataVisuals'
import { User } from 'lucide-react'

/**
 * Renders an individual message with sender info, avatar, and attachments
 */
export const Message = React.memo(({ message, currentUserId }) => {
  const { channelMembers, fetchUserAvatar, userAvatars, loadingAvatars } =
    useChannel()

  // Resolve message sender
  const sender = useMemo(() => {
    const senderMember = channelMembers.find(
      (m) => String(m._id || m.user) === String(message.sender._id),
    )
    return senderMember || message.sender
  }, [message.sender._id, channelMembers])

  const senderId = sender._id || sender
  const isCurrentUser =
    String(message.sender._id) === String(currentUserId) ||
    String(currentUserId) === senderId

  // Fetch avatar if not already loaded
  React.useEffect(() => {
    if (senderId && !userAvatars[senderId] && !loadingAvatars[senderId]) {
      fetchUserAvatar(senderId)
    }
  }, [senderId, fetchUserAvatar, userAvatars, loadingAvatars])

  // Message styling based on sender and status
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

/**
 * Message content component including avatar and attachments
 */
const MessageContent = React.memo(
  ({
    message,
    sender,
    senderId,
    isCurrentUser,
    style,
    avatarData,
    isLoadingAvatar,
  }) => (
    <div
      className={`d-flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} align-items-start gap-2`}
      style={{ maxWidth: '70%' }}
    >
      <div className='flex-shrink-0'>
        <Avatar
          userId={senderId}
          size={40}
          showStatus={false}
          style={{
            border: message.pending ? '1px solid #e9ecef' : 'none',
            opacity: isLoadingAvatar ? 0.5 : 1,
          }}
          imageUrl={avatarData?.url}
          fallback={sender.username?.[0]?.toUpperCase() || '?'}
        />
      </div>
      <div style={style}>
        {!isCurrentUser && <SenderName sender={sender} />}
        <div>{message.text}</div>
        <Attachments message={message} />
      </div>
    </div>
  ),
)

const SenderName = React.memo(({ sender }) => (
  <small className='text-muted d-block mb-1'>
    {sender.username || <User size={16} />}
  </small>
))

const Attachments = React.memo(({ message }) => (
  <>
    {message.attachments?.map((attachment, i) => (
      <div
        key={`${message._id}-attachment-${i}`}
        className='mt-2'
        style={{ maxWidth: '100%', overflow: 'auto' }}
      >
        <EnhancedAttachment attachment={attachment} />
      </div>
    ))}
  </>
))

export default Message
