import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react'
import { ListGroup, Spinner } from 'react-bootstrap'
import { useChannel } from '../../contexts/ChannelContext'
import EnhancedAttachment from './DataVisuals'
import { User } from '../User/User'
import { Avatar } from './Avatar'
const Message = React.memo(({ message, currentUserId }) => {
  const { channelMembers } = useChannel()

  // Resolve sender with fallback for pending messages
  const sender = useMemo(() => {
    const senderMember = channelMembers.find(
      (m) => String(m._id || m.user) === String(message.sender._id),
    )
    return senderMember || message.sender
  }, [message.sender._id, channelMembers])

  //is current user
  const isCurrentUser =
    String(message.sender._id) === String(currentUserId) ||
    String(sender) === String(currentUserId)

  // Consistent message styling for both pending and delivered messages
  const messageContainerStyle = useMemo(
    () => ({
      backgroundColor: isCurrentUser ? '#1CCB8F' : 'black',
      color: isCurrentUser ? 'black' : 'white',
      wordBreak: 'break-word',
      transition: 'all 0.2s ease-in-out',
      opacity: message.pending ? 0.7 : 1,
      padding: '0.75rem 1rem',
      borderRadius: '1rem',
      maxWidth: '100%',
      transform: message.pending ? 'scale(0.98)' : 'scale(1)',
    }),
    [isCurrentUser, message.pending],
  )

  return (
    <ListGroup.Item
      className={`d-flex ${isCurrentUser ? 'justify-content-end' : 'justify-content-start'} border-0 bg-transparent py-2`}
    >
      <div
        className={`d-flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} align-items-start gap-2`}
        style={{ maxWidth: '70%' }}
      >
        <div className='flex-shrink-0'>
          <Avatar
            userId={sender._id ? sender._id : sender}
            size={40}
            showStatus={false}
            style={{
              border: message.pending ? '2px solid #e9ecef' : 'none',
            }}
          />
        </div>
        <div style={messageContainerStyle}>
          {!isCurrentUser && (
            <small className='text-muted d-block mb-1'>
              <User id={sender._id} />
            </small>
          )}
          <div>{message.text}</div>
          {message.attachments?.map((attachment, i) => (
            <div
              key={`${message._id}-attachment-${i}`}
              className='mt-2'
              style={{ maxWidth: '100%', overflow: 'auto' }}
            >
              <EnhancedAttachment attachment={attachment} />
            </div>
          ))}
        </div>
      </div>
    </ListGroup.Item>
  )
})

Message.displayName = 'Message'

export const MessageList = ({ messages, currentUserId, isLoading }) => {
  const listRef = useRef(null)
  const bottomRef = useRef(null)
  const { channelMembers, prefetchMemberAvatars, userAvatars } = useChannel()
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)

  // Pre-fetch avatars for all members
  useEffect(() => {
    const fetchAvatars = async () => {
      if (channelMembers.length > 0) {
        await prefetchMemberAvatars(channelMembers)
        console.log('Current userAvatars state:', userAvatars)
      }
    }
    fetchAvatars()
  }, [channelMembers])
  // Enhanced message sorting with proper pending message handling
  const sortedMessages = useMemo(() => {
    if (!messages) return []
    return [...messages].sort((a, b) => {
      // Handle pending messages
      if (a.pending && !b.pending) return 1
      if (!b.pending && b.pending) return -1

      // Handle timestamps
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date()
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date()
      return dateA - dateB
    })
  }, [messages])

  // Improved scroll behavior
  const scrollToBottom = useCallback((behavior = 'smooth') => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior })
    }
  }, [])

  useEffect(() => {
    if (!hasScrolledToBottom) {
      scrollToBottom('auto')
      setHasScrolledToBottom(true)
    } else {
      scrollToBottom('smooth')
    }
  }, [sortedMessages, hasScrolledToBottom, scrollToBottom])

  if (isLoading) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '54vh' }}
      >
        <Spinner animation='border' role='status' style={{ color: '#1CCB8F' }}>
          <span className='visually-hidden'>Loading messages...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <ListGroup
      ref={listRef}
      style={{
        height: '54vh',
        overflowY: 'auto',
        scrollBehavior: 'smooth',
        padding: '1rem',
      }}
    >
      {sortedMessages.map((message) => (
        <Message
          key={message._id || `temp-${Date.now()}-${Math.random()}`}
          message={message}
          currentUserId={currentUserId}
        />
      ))}
      <div ref={bottomRef} />
    </ListGroup>
  )
}

export default React.memo(MessageList)
