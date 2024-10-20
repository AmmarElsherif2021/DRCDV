import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Container,
  Row,
  Col,
  ListGroup,
  Stack,
  Spinner,
  Image,
} from 'react-bootstrap'
import { CreateMessage } from '../Components/Messages/CreateMessage.jsx'
import { getChannelById } from '../API/channels'
import { getMessagesByChannelId } from '../API/messages.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useSocket } from '../contexts/SocketContext.jsx'
import { User } from '../Components/User/User.jsx'
import userAvatar from '../assets/profile.svg'
import { jwtDecode } from 'jwt-decode'

export const ChatSpace = ({ channelId }) => {
  const [token] = useAuth()
  const socket = useSocket()

  const decodeToken = (token) => {
    if (!token || typeof token !== 'string') {
      console.error('Invalid token:', 'Token must be a valid string')
      return null
    }
    try {
      const decoded = jwtDecode(token)
      return { userId: decoded.sub, username: decoded.username }
    } catch (error) {
      console.error('Invalid token:', error)
      return null
    }
  }

  const userData = decodeToken(token)
  const [channelMessages, setChannelMessages] = useState([])
  const [channelMembers, setChannelMembers] = useState([])
  const listRef = useRef(null)

  const { data: channelData } = useQuery({
    queryKey: ['channel', { channelId }],
    queryFn: () => getChannelById(channelId, token),
    enabled: !!channelId,
  })

  useEffect(() => {
    if (channelData) {
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

  if (!channelData) return <Spinner animation='border' role='status' />

  return (
    <Container className='p-3'>
      <Row>
        <Col>
          <h2>
            {channelData &&
              channelData.title &&
              (channelData.title
                .split(',')
                .filter((x) => x !== userData.userId)[0] ||
                userData.userId)}
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
                        {member.username}
                      </div>
                    </ListGroup.Item>
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
              <ListGroup.Item
                key={index}
                className={`d-flex justify-content-${
                  message.sender._id === userData.userId ? 'end' : 'start'
                }`}
              >
                <div
                  className={`d-flex align-items-start ${
                    message.sender._id === userData.userId
                      ? 'flex-row-reverse'
                      : 'flex-row'
                  }`}
                >
                  <Image
                    src={userAvatar}
                    alt={message.sender.username}
                    roundedCircle
                    style={{ width: '2.5rem', height: '2.5rem' }}
                  />
                  <div
                    className={`mx-2 p-3 rounded-lg ${
                      message.sender._id === userData.userId
                        ? 'bg-primary text-white'
                        : 'bg-light text-dark'
                    }`}
                  >
                    <p className='mb-1'>{message.text}</p>
                    {message.attachments &&
                      message.attachments.map((attachment, i) => (
                        <div key={i} className='mt-2'>
                          {attachment.isImage ? (
                            <Image
                              src={`data:${attachment.contentType};base64,${attachment.data}`}
                              alt={attachment.filename}
                              style={{ maxWidth: '200px', maxHeight: '200px' }}
                              fluid
                            />
                          ) : (
                            <a
                              href={`data:${attachment.contentType};base64,${attachment.data}`}
                              download={attachment.filename}
                              className='text-primary'
                            >
                              {attachment.filename}
                            </a>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <CreateMessage channelId={channelId} sendMessage={sendMessage} />
    </Container>
  )
}

export default ChatSpace
