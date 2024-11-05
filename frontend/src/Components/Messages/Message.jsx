import React, { useMemo } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useChannel } from '../../contexts/ChannelContext'
import { Avatar } from './Avatar'
import EnhancedAttachment from './DataVisuals'
import { User } from 'lucide-react'

export const Message = React.memo(({ message, currentUserId }) => {
  const { channelMembers, getAvatarState } = useChannel()

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

  const avatarState = getAvatarState(senderId)

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
        avatarState={avatarState}
      />
    </ListGroup.Item>
  )
})

const MessageContent = React.memo(
  ({ message, sender, senderId, isCurrentUser, style, avatarState }) => {
    const isLoading = avatarState.status === 'loading'

    return (
      <div
        className={`d-flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} align-items-start gap-2`}
        style={{ maxWidth: '97%' }}
      >
        {!isCurrentUser && (
          <div className='flex-shrink-0'>
            <Avatar
              userId={senderId}
              size={40}
              showStatus={false}
              style={{
                border: message.pending ? '1px solid #e9ecef' : 'none',
                opacity: isLoading ? 0.5 : 1,
              }}
            />
            <div
              style={{
                fontSize: '10px',
                color: '#666',
                marginTop: '1px',
                marginLeft: '0.75rem',
              }}
            >
              {!isCurrentUser && <SenderName sender={sender} />}
            </div>
          </div>
        )}
        <div style={style}>
          <div>{message.text}</div>
          <div
            className='message-attachments'
            style={{
              // text color for attachments
              color: 'initial',

              marginTop: message.text ? '0.5rem' : 0,
            }}
          >
            <Attachments message={message} />
          </div>
        </div>
      </div>
    )
  },
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
        style={{
          maxWidth: '100%',
          overflow: 'auto',

          backgroundColor: 'white',
          borderRadius: '0.5rem',

          padding: '0.5rem',
        }}
      >
        <EnhancedAttachment attachment={attachment} />
        <small style={{ color: '#999999' }}>{attachment.filename}</small>
      </div>
    ))}
  </>
))

export default Message
