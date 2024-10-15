import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Container, Row, Col, ListGroup, Stack } from 'react-bootstrap'
//import io from 'socket.io-client'
import { CreateMessage } from '../Components/Messages/CreateMessage.jsx'
import { getChannelById } from '../API/channels'
import { useAuth } from '../contexts/AuthContext.jsx'
import { User } from '../Components/User/User.jsx'
import userAvatar from '../assets/profile.svg'
import { jwtDecode } from 'jwt-decode'

// Connect to Socket.IO server
//const socket = io('http://localhost:3001')

// eslint-disable-next-line react/prop-types
export function ChatSpace({ channelId }) {
  const [token] = useAuth()

  const decodeToken = (token) => {
    if (!token || typeof token !== 'string') {
      console.error('Invalid token:', 'Token must be a valid string')
      return null
    }
    try {
      const decoded = jwtDecode(token)
      const userId = decoded.sub // Extracting 'sub' for user ID
      return { userId }
    } catch (error) {
      console.error('Invalid token:', error)
      return null
    }
  }

  const userData = decodeToken(token)
  const [channelMessages, setChannelMessages] = useState([])
  const [channelMembers, setChannelMembers] = useState([])

  // Fetch messages when channelId changes
  const { data: channelData } = useQuery({
    queryKey: ['channel', { channelId }],
    queryFn: () => getChannelById(channelId, token),
    enabled: !!channelId,
  })

  // useRef to messages list
  const listRef = useRef(null)

  useEffect(() => {
    if (channelData && channelData.messages) {
      setChannelMessages(channelData.messages)
    }
    // update members
    if (channelData && channelData.members) {
      setChannelMembers(channelData.members)
    }
    // scroll to the last message added
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [channelData])

  // useEffect(() => {
  //   socket.on('message', (msg) => {
  //     setChannelMessages((prevMessages) => [...prevMessages, msg])
  //     if (listRef.current) {
  //       listRef.current.scrollTop = listRef.current.scrollHeight
  //     }
  //   })
  //   return () => {
  //     socket.off('message')
  //   }
  // }, [])

  // const sendMessage = (msg) => {
  //   socket.emit('message', msg)
  // }

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
                        .filter((x) => x !== userData.userId)[0]
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
                            <User id={member.user} />
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
                    className={`d-flex justify-content-${message.user === 'User 1' ? 'start' : 'end'}`}
                  >
                    <Stack
                      direction='horizontal'
                      className={`bg-${message.user === 'User 1' ? 'primary' : 'secondary'} text-white rounded p-2`}
                    >
                      <strong>{message.user}: </strong>
                      {message.text}
                    </Stack>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <CreateMessage
            channelId={channelId}
            sendMessage={() => console.log('send message placeholder')}
          />
        </Container>
      ) : (
        <div style={{ padding: '7rem' }}>
          <h1>Press on contact or channel to start messaging!</h1>
        </div>
      )}
    </>
  )
}
