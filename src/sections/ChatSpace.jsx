import { useQuery } from '@tanstack/react-query'
import { getChannelById } from '../API/channels'
import { getMessagesByChannelId } from '../API/messages'
import { useAuth } from '../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { useSocket } from '../contexts/SocketContext'
import {
  Container,
  Row,
  Col,
  ListGroup,
  Stack,
  ListGroupItem,
} from 'react-bootstrap'
import { CreateMessage } from '../Components/Messages/CreateMessage'
import { User } from '../Components/User/User'
import { useEffect, useState, useRef } from 'react'
import userAvatar from '../assets/Profile.svg'
import otherUserAvatar from '../assets/otherProfile.svg'

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
                        <div
                          key={index}
                          style={{
                            marginRight: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          {' '}
                          <div
                            style={{
                              borderRadius: 50,
                              width: '4rem',
                              height: '4rem',
                            }}
                          >
                            <img src={userAvatar} style={{ width: '4rem' }} />
                          </div>
                          <User id={member.user || userData.userId} />
                        </div>
                      ),
                  )}
              </ListGroup>
              <hr />
              <ListGroup
                ref={listRef}
                style={{
                  minHeight: '60vh',
                  maxHeight: '60vh',
                  overflow: 'auto',
                }}
              >
                {channelMessages.map((message, index) => (
                  <ListGroupItem
                    key={index}
                    className={`d-flex justify-content-${
                      message.sender === userData.userId ? 'end' : 'start'
                    }`}
                    style={{ border: 'none' }}
                  >
                    <Stack
                      direction='horizontal'
                      style={
                        message.sender === userData.userId
                          ? {
                              backgroundColor: '#1CCB8F',
                              color: '#000',
                              borderRadius: '15px',
                              padding: '10px',
                              alignSelf: 'flex-end',
                            }
                          : {
                              backgroundColor: '#000',
                              color: '#1CCB8F',
                              borderRadius: '15px',
                              padding: '10px',
                              alignSelf: 'flex-start',
                            }
                      }
                    >
                      {message.sender == userData.userId ? (
                        <img
                          src={userAvatar}
                          alt={message.sender}
                          style={{ width: '2.5rem' }}
                        />
                      ) : (
                        <img
                          src={otherUserAvatar}
                          alt={message.sender}
                          style={{ width: '2.5rem' }}
                        />
                      )}
                      <span style={{ width: '1rem' }}></span>
                      {message.text}
                      {Array.isArray(message.attachments) &&
                        message.attachments.length > 0 && (
                          <div style={{ marginTop: '10px' }}>
                            {message.attachments.map((attachment, i) => {
                              return (
                                <div key={i} style={{ marginTop: '5px' }}>
                                  {attachment &&
                                  attachment.contentType &&
                                  typeof attachment.data === 'string' &&
                                  attachment.contentType.startsWith(
                                    'image/',
                                  ) ? (
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
                                    typeof attachment.data === 'string' && (
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
                  </ListGroupItem>
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
