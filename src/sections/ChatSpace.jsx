/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Image,
  Dropdown,
} from 'react-bootstrap'
import { CreateMessage } from '../Components/Messages/CreateMessage.jsx'
import { getChannelById } from '../API/channels'
import { getMessagesByChannelId } from '../API/messages.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useSocket } from '../contexts/SocketContext.jsx'
import userAvatar from '../assets/profile.svg'
import channelAvatar from '../assets/group-icon.svg'
import { jwtDecode } from 'jwt-decode'
import MessagingList from '../Components/Messages/MessageList.jsx'
import { User } from '../Components/User/User.jsx'

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

  const { data: channelData, isLoading: isChannelLoading } = useQuery({
    queryKey: ['channel', { channelId }],
    queryFn: () => getChannelById(channelId, token),
    enabled: !!channelId,
  })

  const { data: messagesData, isLoading: isMessagesLoading } = useQuery({
    queryKey: ['messages', { channelId }],
    queryFn: () => getMessagesByChannelId(channelId, token),
    enabled: !!channelId,
  })

  useEffect(() => {
    if (channelData && channelData.members) {
      setChannelMembers(channelData.members)
    }
  }, [channelData])

  useEffect(() => {
    if (messagesData) {
      setChannelMessages(messagesData)
    }
  }, [messagesData])

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (msg) => {
        setChannelMessages((prevMessages) => [...prevMessages, msg])
      }
      socket.on('messageCreated', handleNewMessage)
      return () => {
        socket.off('messageCreated', handleNewMessage)
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

  if (isChannelLoading || isMessagesLoading) {
    return <Spinner animation='border' role='status' />
  }

  const channelTitle = channelData?.title ? (
    <div className='d-flex flex-row align-items-center'>
      {channelMembers.length > 2 ? (
        <Image src={channelAvatar} alt='Channel' style={{ width: '3rem' }} />
      ) : (
        <Image src={userAvatar} alt='User' style={{ width: '3rem' }} />
      )}
      <Dropdown>
        <Dropdown.Toggle variant='link' id='dropdown-basic'>
          {(
            <User
              id={
                channelData.title
                  .split(',')
                  .filter((x) => x !== userData.userId)[0]
              }
            />
          ) || 'Channel Members'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {channelMembers.map(
            (member) =>
              member.user !== userData.userId && (
                <Dropdown.Item key={member.user}>
                  <User id={member.user} />
                </Dropdown.Item>
              ),
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ) : (
    ''
  )

  return (
    <Container fluid className='p-4'>
      <Row>
        <Col>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            {channelTitle}
          </div>
          <MessagingList
            messages={channelMessages}
            currentUserId={userData.userId}
          />
          <CreateMessage channelId={channelId} sendMessage={sendMessage} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup horizontal className='flex-wrap overflow-auto'>
            {channelMembers.map(
              (member) =>
                member.user !== userData.userId && (
                  <ListGroup.Item
                    key={member.user}
                    className='d-flex flex-column align-items-center mx-2'
                  >
                    <Image
                      src={userAvatar}
                      alt='User'
                      roundedCircle
                      style={{ width: '3rem' }}
                    />
                    <User id={member.user} />
                  </ListGroup.Item>
                ),
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default ChatSpace
