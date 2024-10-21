/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Container, Row, Col, ListGroup, Spinner, Image } from 'react-bootstrap'
import { CreateMessage } from '../Components/Messages/CreateMessage.jsx'
import { getChannelById } from '../API/channels'
import { getMessagesByChannelId } from '../API/messages.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useSocket } from '../contexts/SocketContext.jsx'
import userAvatar from '../assets/profile.svg'
import { jwtDecode } from 'jwt-decode'
import MessagingList from '../Components/Messages/MessageList.jsx'

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
    if (channelData) {
      if (channelData.members) {
        setChannelMembers(channelData.members)
      }
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

  if (isChannelLoading || isMessagesLoading)
    return <Spinner animation='border' role='status' />

  const channelTitle = channelData?.title
    ? channelData.title.split(',').filter((x) => x !== userData.userId)[0] ||
      userData.userId
    : ''

  return (
    <Container className='p-3'>
      <Row>
        <Col>
          <h2>{channelTitle}</h2>
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
                (member) =>
                  member.user !== userData.userId && (
                    <ListGroup.Item
                      key={member.user}
                      style={{ flex: '0 0 auto', marginRight: '1rem' }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <Image src={userAvatar} style={{ width: '3rem' }} />
                        {member.username}
                      </div>
                    </ListGroup.Item>
                  ),
              )}
          </ListGroup>
          <hr />
          <MessagingList
            messages={channelMessages}
            currentUserId={userData.userId}
          />
        </Col>
      </Row>
      <CreateMessage channelId={channelId} sendMessage={sendMessage} />
    </Container>
  )
}

export default ChatSpace
