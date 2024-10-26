/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react'
import { ListGroup, Image } from 'react-bootstrap'
import userAvatar from '../../assets/profile.svg'
import EnhancedAttachment from './DataVisuals'

const Message = ({ message, isCurrentUser }) => (
  <ListGroup.Item
    className={`d-flex justify-content-${isCurrentUser ? 'end' : 'start'} border-0 bg-transparent`}
  >
    <div
      className={`d-flex align-items-start ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
      style={{ maxWidth: '70%' }}
    >
      <Image
        src={userAvatar}
        alt={message.sender.username}
        roundedCircle
        style={{ width: '2.5rem', height: '2.5rem' }}
      />
      <div
        className='mx-2 p-3 rounded'
        style={{
          backgroundColor: isCurrentUser ? '#1CCB8F' : 'black',
          color: isCurrentUser ? 'black' : 'white',
          wordBreak: 'break-word',
        }}
      >
        <p className='mb-1'>{message.text}</p>
        {message.attachments?.map((attachment, i) => (
          <div
            key={i}
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

export const MessageList = ({ messages, currentUserId }) => {
  const listRef = useRef(null)
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  return (
    <ListGroup ref={listRef} style={{ height: '60vh', overflowY: 'auto' }}>
      {messages?.map((message, index) => (
        <Message
          key={message._id || index}
          message={message}
          isCurrentUser={message.sender._id === currentUserId}
        />
      ))}
    </ListGroup>
  )
}

export default MessageList
