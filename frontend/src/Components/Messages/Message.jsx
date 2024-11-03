import React, { useMemo } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useChannel } from '../../contexts/ChannelContext'
import { Avatar } from './Avatar'
import EnhancedAttachment from './DataVisuals'
import { User } from 'lucide-react'
/**
 * Renders an individual message with sender info and attachments
 */
export const Message = React.memo(({ message, currentUserId }) => {
  const { channelMembers } = useChannel()

  // Resolve message sender
  const sender = useMemo(() => {
    const senderMember = channelMembers.find(
      (m) => String(m._id || m.user) === String(message.sender._id),
    )
    return senderMember || message.sender
  }, [message.sender._id, channelMembers])

  const isCurrentUser =
    String(message.sender._id) === String(currentUserId) ||
    String(currentUserId) === sender

  // Message styling based on sender and status
  const messageStyle = useMemo(
    () => ({
      backgroundColor: isCurrentUser ? '#1CCB8F' : 'black',
      color: isCurrentUser ? 'black' : 'white',
      opacity: message.pending ? 0.7 : 1,
      transform: message.pending ? 'scale(0.98)' : 'scale(1)',
      padding: '0.75rem 1rem',
      borderRadius: '1rem',
      maxWidth: '100%',
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
        isCurrentUser={isCurrentUser}
        style={messageStyle}
      />
    </ListGroup.Item>
  )
})
/**
 * Message content component including avatar and attachments
 */
const MessageContent = React.memo(
  ({ message, sender, isCurrentUser, style }) => (
    <div
      className={`d-flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} align-items-start gap-2`}
      style={{ maxWidth: '70%' }}
    >
      <Avatar
        userId={sender._id || sender}
        size={40}
        showStatus={false}
        style={{ border: message.pending ? '2px solid #e9ecef' : 'none' }}
      />
      <div style={style}>
        {!isCurrentUser && <SenderName sender={sender} />}
        <div>{message.text}</div>
        <Attachments message={message} />
        {/**JSON.stringify(message).substring(0, 300) */}
      </div>
    </div>
  ),
)

// Helper Components
const LoadingSpinner = () => (
  <div
    className='d-flex justify-content-center align-items-center'
    style={{ height: '54vh' }}
  >
    <Spinner animation='border' role='status' style={{ color: '#1CCB8F' }}>
      <span className='visually-hidden'>Loading messages...</span>
    </Spinner>
  </div>
)

const SenderName = React.memo(({ sender }) => (
  <small className='text-muted d-block mb-1'>
    <User id={sender._id} />
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
