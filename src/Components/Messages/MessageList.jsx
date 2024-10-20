/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react'
import {
  Card,
  ListGroup,
  ListGroupItem,
  Spinner,
  Container,
  Row,
  Image,
  Alert,
} from 'react-bootstrap'
import { getMessagesByChannelId } from '../../API/messages'

export const MessageList = ({ channelId, token }) => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true)
      setError(null)

      if (!channelId) {
        console.error('No channel ID provided')
        setError('No channel ID provided')
        setIsLoading(false)
        return
      }

      console.log(`Fetching messages for channel: ${channelId}`)
      console.log(`Token: ${token.substring(0, 10)}...`)

      try {
        const data = await getMessagesByChannelId(channelId, token)
        console.log(`Received ${data.length} messages`)
        setMessages(data)
      } catch (err) {
        console.error('Error fetching messages:', err)
        setError(`Error fetching messages: ${err.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [channelId, token])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (isLoading) return <Spinner animation='border' role='status' />

  if (error) return <Alert variant='danger'>{error}</Alert>

  if (messages.length === 0)
    return <Alert variant='info'>No messages found for this channel.</Alert>

  return (
    <Card style={{ width: '100%', height: '60vh' }}>
      <Card.Body style={{ padding: 0 }}>
        <Container fluid style={{ height: '100%', overflowY: 'auto' }}>
          <Row className='d-flex flex-column-reverse'>
            {channelMessages.map((message, index) => (
              <ListGroup.Item
                key={index}
                className={`d-flex justify-content-${
                  message.sender === userData.userId ? 'end' : 'start'
                }`}
              >
                <Stack
                  direction='horizontal'
                  style={
                    message.sender === userData.userId
                      ? {
                          backgroundColor: '#007bff',
                          color: 'white',
                          borderRadius: '15px',
                          padding: '10px',
                          alignSelf: 'flex-end',
                        }
                      : {
                          backgroundColor: '#6c757d',
                          color: 'white',
                          borderRadius: '15px',
                          padding: '10px',
                          alignSelf: 'flex-start',
                        }
                  }
                >
                  {message.sender === userData.userId ? (
                    <strong>Me</strong>
                  ) : (
                    <div>
                      <User id={message.sender} />
                    </div>
                  )}
                  : {message.text}
                  {Array.isArray(message.attachments) &&
                    message.attachments.length > 0 && (
                      <div style={{ marginTop: '10px' }}>
                        {message.attachments.map((attachment, i) => {
                          console.log('Attachment:', attachment) // Log attachment data for debugging
                          return (
                            <div key={i} style={{ marginTop: '5px' }}>
                              {attachment &&
                              attachment.contentType &&
                              attachment.data &&
                              attachment.contentType.startsWith('image/') ? (
                                <img
                                  src={`data:${attachment.contentType};base64,${attachment.data}`}
                                  alt={attachment.filename}
                                  style={{
                                    maxWidth: '200px',
                                    maxHeight: '200px',
                                    display: 'block',
                                  }}
                                />
                              ) : (
                                attachment &&
                                attachment.contentType &&
                                attachment.data && (
                                  <a
                                    href={`data:${attachment.contentType};base64,${attachment.data}`}
                                    download={attachment.filename}
                                  >
                                    {attachment.filename}
                                  </a>
                                )
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                </Stack>
              </ListGroup.Item>
            ))}
          </Row>
          <div ref={messagesEndRef} />
        </Container>
      </Card.Body>
    </Card>
  )
}

export default MessageList
