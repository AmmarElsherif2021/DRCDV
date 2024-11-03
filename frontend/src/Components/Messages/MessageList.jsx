import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Message } from './Message'

/**
 * Renders a scrollable list of messages
 */
const MessageList = React.memo(({ messages, currentUserId, isLoading }) => {
  const bottomRef = useRef(null)
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)

  // Sort messages by timestamp and pending status
  const sortedMessages = useMemo(() => {
    if (!messages) return []
    return [...messages].sort((a, b) => {
      if (a.pending && !b.pending) return 1
      if (!a.pending && b.pending) return -1
      return new Date(a.createdAt) - new Date(b.createdAt)
    })
  }, [messages])

  // Scroll handling
  const scrollToBottom = useCallback((behavior = 'smooth') => {
    bottomRef.current?.scrollIntoView({ behavior })
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
    return <LoadingSpinner />
  }

  return (
    <ListGroup
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
})
export default MessageList
