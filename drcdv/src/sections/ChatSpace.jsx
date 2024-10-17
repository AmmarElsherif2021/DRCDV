import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Container, Row, Col, ListGroup, Stack } from 'react-bootstrap'
import { CreateMessage } from '../Components/Messages/CreateMessage.jsx'
import { getChannelById } from '../API/channels'
import { getMessagesByChannelId } from '../API/messages.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useSocket } from '../contexts/SocketContext.jsx'
import { User } from '../Components/User/User.jsx'
import userAvatar from '../assets/profile.svg'
import { jwtDecode } from 'jwt-decode'

// eslint-disable-next-line react/prop-types
export function ChatSpace({ channelId }) {
  const [token] = useAuth()
  const socket = useSocket()
  const decodeToken = (token) => {
    if (!token || typeof token !== 'string') {
      console.error('Invalid token:', 'Token must be a valid string')
      return null
    }
    try {
      const decoded = jwtDecode(token)
      const userId = decoded.sub
      const username = decoded.username
      return { userId, username }
    } catch (error) {
      console.error('Invalid token:', error)
      return null
    }
  }
  const userData = decodeToken(token)
  const [channelMessages, setChannelMessages] = useState([])
  const [channelMembers, setChannelMembers] = useState([])
  const { data: channelData } = useQuery({
    queryKey: ['channel', { channelId }],
    queryFn: () => getChannelById(channelId, token),
    enabled: !!channelId,
  })
  const listRef = useRef(null)

  useEffect(() => {
    if (channelData) {
      console.log(JSON.stringify(channelData))
      // Fetch channel messages
      getMessagesByChannelId(channelId, token)
        .then((messages) => {
          setChannelMessages(messages)
          messages.forEach((m) =>
            console.log(`historical message --- ${JSON.stringify(m)}`),
          )
        })
        .catch((error) => console.error('Error fetching messages:', error))
    }
    if (channelData && channelData.members) {
      setChannelMembers(channelData.members)
    }
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [channelData, channelId, token])

  useEffect(() => {
    if (socket) {
      socket.on('messageCreated', (msg) => {
        setChannelMessages((prevMessages) => [...prevMessages, msg])
        if (listRef.current) {
          listRef.current.scrollTop = listRef.current.scrollHeight
        }
      })
      return () => {
        socket.off('messageCreated')
      }
    }
  }, [socket])

  const sendMessage = (msg) => {
    if (socket) {
      socket.emit('createMessage', {
        userId: userData.userId,
        channelId,
        messageData: { text: msg, attachments: [] },
      })
    }
  }

  return (
    <>
      {token && channelData ? (
        <Container className='p-3'>
          <Row>
            <Col>
              <h2>
                {channelData && (
                  <User
                    id={
                      channelData.title
                        .split(',')
                        .filter((x) => x !== userData.userId)[0] ||
                      userData.userId
                    }
                  />
                )}
              </h2>
              <hr />
              <ListGroup
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                }}
              >
                {channelMembers.length > 2 &&
                  channelMembers.map(
                    (member, index) =>
                      member.user !== userData.userId && (
                        <ListGroup.Item
                          key={index}
                          style={{ flex: '0 0 auto', marginRight: '1rem' }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}
                          >
                            <img src={userAvatar} style={{ width: '3rem' }} />
                            <User id={member.user || userData.userId} />
                          </div>
                        </ListGroup.Item>
                      ),
                  )}
              </ListGroup>
              <hr />
              <ListGroup
                ref={listRef}
                style={{
                  minHeight: '30vh',
                  maxHeight: '30vh',
                  overflow: 'auto',
                }}
              >
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
                            {message.attachments.map((attachment, i) => (
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
                            ))}
                          </div>
                        )}
                    </Stack>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <CreateMessage channelId={channelId} sendMessage={sendMessage} />
        </Container>
      ) : (
        <div style={{ padding: '7rem' }}>
          <h1>Press on contact or channel to start messaging!</h1>
        </div>
      )}
    </>
  )
}
