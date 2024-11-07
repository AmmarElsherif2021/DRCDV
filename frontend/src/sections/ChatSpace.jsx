/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Container, Row, Col, Spinner, Image, Dropdown } from 'react-bootstrap'
import { ProfileImage } from '../Components/User/ProfileImage.jsx'
import { CreateMessage } from '../Components/Messages/CreateMessage.jsx'
import { getChannelById } from '../API/channels'
import { getMessagesByChannelId } from '../API/messages.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useSocket } from '../contexts/SocketContext.jsx'
import userAvatar from '../assets/profile.svg'
import sendGif from '../assets/startSending.json'
import { Player } from '@lottiefiles/react-lottie-player'
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

  const ChannelTitle = channelData?.title ? (
    <div
      className='d-flex flex-row align-items-center'
      style={{ width: '100%', paddingTop: '1em', paddingLeft: '1em' }}
    >
      {channelMembers.length > 2 ? (
        <Image
          src={channelAvatar}
          alt='Channel'
          style={{ width: '3rem', height: '3rem', marginRight: '0.5rem' }}
        />
      ) : (
        <ProfileImage
          userId={
            channelData.title.split(',').filter((x) => x !== userData.userId)[0]
          }
          size={32}
          showStatus={true}
        />
      )}
      <Dropdown>
        <Dropdown.Toggle
          variant='light'
          id='dropdown-basic'
          className='d-flex align-items-center'
          style={{
            fontSize: '1rem',
            //sfontWeight: 'bold',
            color: '#333',
            border: 'none',
            backgroundColor: 'transparent',
            padding: '1rem',
            cursor: 'pointer',
          }}
        >
          <User
            id={
              channelData.title
                .split(',')
                .filter((x) => x !== userData.userId)[0]
            }
            className='mr-2'
          />
          <span className='caret'></span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {channelMembers.map(
            (member) =>
              member.user !== userData.userId && (
                <Dropdown.Item key={member.user}>
                  <User id={member.user} showEmail={true} />
                </Dropdown.Item>
              ),
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ) : (
    ''
  )

  if (!channelId) {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: sendGif,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }

    return (
      <div
        style={{
          position: 'absolute',
          padding: '1rem',
          right: 0,
          left: '6rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '92%',
          minWidth: '20rem',
          height: '90%',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '65%',
            height: 'auto',
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          <Player
            autoplay={defaultOptions.autoplay}
            loop={defaultOptions.loop}
            src={defaultOptions.animationData}
            style={{ height: '52%', width: '52%' }}
          />
        </div>
        <h1
          style={{
            fontSize: '1.4em',
            fontWeight: 400,
            color: 'black',
            padding: '0 5rem',
          }}
        >
          Navigate to connections or channels and start messaging
        </h1>
      </div>
    )
  }

  return (
    <Container
      fluid
      style={{
        position: 'relative',
        left: '-16%',
        top: '1rem',
        height: '98%',
        width: '110%',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Row>
        <Col>
          <div
            className='d-flex justify-content-between align-items-center mb-3'
            style={{
              height: '3rem',
              width: '100%',
              padding: 0,
            }}
          >
            {ChannelTitle}
          </div>
          <MessagingList
            messages={channelMessages}
            currentUserId={userData.userId}
          />
          <CreateMessage channelId={channelId} sendMessage={sendMessage} />
        </Col>
      </Row>
    </Container>
  )
}

export default ChatSpace
