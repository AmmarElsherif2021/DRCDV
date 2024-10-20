import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listChannels, createChannel, getChannelById } from '../API/channels'
import { getUsers } from '../API/users'
import { useAuth } from '../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
import {
  Container,
  Card,
  Button,
  ListGroupItem,
  ListGroup,
  Offcanvas,
} from 'react-bootstrap'
import { CreateChannel } from '../Components/Channels/CreateChannel'
import { ChannelCard } from '../Components/Channels/ChannelCard'
import { useChannel } from '../contexts/ChannelContext'
import profileIcon from '../assets/profile.svg'
import { User } from '../Components/User/User'
import { useState, useEffect } from 'react'

//assets
import createChannelIcon from '../assets/createGroup.svg'
import connectionsIcon from '../assets/connections.svg'
import channelsIcon from '../assets/channels.svg'
import { ConnectionsList } from './ConnectionsList'
import { ChannelsList } from './ChannelsList'
//styles
const iconDivStyle = {
  cursor: 'pointer',
  textAlign: 'center',
  marginBottom: '2rem',
  marginTop: '2rem',
  paddingTop: '2rem',
  paddingBottom: '2rem',
  height: '5rem',
  width: '12rem',
}
//ChannelBoard Component .............................................................................
export function ChannelsBoard() {
  const [token] = useAuth()
  const { setSelectedChannel, setChannelMessages, setChannelMembers } =
    useChannel()

  const decodeToken = (token) => {
    if (!token || typeof token !== 'string') {
      console.error('Invalid token:', 'Token must be a valid string')
      return null
    }
    try {
      const decoded = jwtDecode(token)
      const userId = decoded.sub
      //const username = decoded.username
      return { userId }
    } catch (error) {
      console.error('Invalid token:', error)
      return null
    }
  }
  const userData = decodeToken(token)
  useEffect(() => console.log(`user data ${JSON.stringify(userData)}`), [])
  //Tanstack
  const queryClient = useQueryClient()
  const channelsQuery = useQuery({
    queryKey: ['channels', { userId: userData?.userId }],
    queryFn: () => listChannels({ userId: userData?.userId }),
    enabled: !!userData?.userId,
  })

  const createChannelMutation = useMutation({
    mutationFn: ({ title, members }) =>
      createChannel(token, { title, members }),
    onSuccess: () => {
      queryClient.invalidateQueries(['channels'])
    },
  })

  const handleCreateChannels = async () => {
    try {
      const users = await getUsers()
      for (const user of users) {
        if (user._id !== userData.userId) {
          const title = `${userData.userId},${user._id}`
          const members = [{ user: user._id, role: 'admin' }]
          await createChannelMutation.mutateAsync({ title, members })
        }
      }
    } catch (error) {
      console.error('Error creating channels:', error)
    }
  }

  const handleChannelClick = async (channelId) => {
    try {
      const channel = await getChannelById(channelId, token)
      setChannelMessages(channel.messages)
      setChannelMembers(channel.members)
      setSelectedChannel(channelId)
    } catch (error) {
      console.error(error)
    }
  }

  //UI toggles and hover
  const [showConnections, setShowConnections] = useState(false)
  const [showCreateChannel, setShowCreateChannel] = useState(false)
  const [showChannels, setShowChannels] = useState(false)

  const handleCloseConnections = () => setShowConnections(false)
  const handleShowConnections = () => setShowConnections(true)

  const handleCloseCreateChannel = () => setShowCreateChannel(false)
  const handleShowCreateChannel = () => setShowCreateChannel(true)

  const handleCloseChannels = () => setShowChannels(false)
  const handleShowChannels = () => setShowChannels(true)

  const [hoveredButton, setHoveredButton] = useState('')
  const handleMouseEnter = (button) => {
    setHoveredButton(button)
  }
  const handleMouseLeave = () => {
    setHoveredButton('')
  }
  if (!userData) {
    return <div>Please log in to view your channels.</div>
  }

  const channels = channelsQuery.data ?? []

  return (
    <div style={{ height: '100vh', overflowY: 'auto' }}>
      {channels && channels.length < 1 ? (
        <div
          style={{
            position: 'absolute',
            width: '99%',
            height: '100%',
            backgroundColor: 'white',
            padding: '7rem',
            textAlign: 'center',
            zIndex: 1000,
          }}
        >
          <h1>WELCOME TO DRCDV</h1>
          <hr />
          <p>Add connections and enjoy messaging</p>
          <Button variant='primary' onClick={handleCreateChannels}>
            Add Connections
          </Button>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '5rem',
            alignItems: 'center',
            width: '20rem',
          }}
        >
          <Card className='mb-4 text-center' style={{ width: '10rem' }}>
            <Card.Body
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={profileIcon}
                alt='Profile'
                style={{ width: '5rem', borderRadius: '50%' }}
              />
              <User id={userData.userId} />
            </Card.Body>
          </Card>
          <Container
            className='p-4 bg-light'
            style={{
              width: '20vw',
              borderRight: '3px solid #ddd',
            }}
          >
            <div
              onMouseEnter={() => handleMouseEnter('connections')}
              onMouseLeave={handleMouseLeave}
              onClick={handleShowConnections}
              style={iconDivStyle}
            >
              {hoveredButton === 'connections' ? (
                <span
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                  }}
                >
                  Connections
                </span>
              ) : (
                <img
                  src={connectionsIcon}
                  alt='Connections'
                  style={{
                    width: '3rem',
                  }}
                />
              )}
            </div>
            <div
              onMouseEnter={() => handleMouseEnter('createChannel')}
              onMouseLeave={handleMouseLeave}
              onClick={handleShowCreateChannel}
              style={iconDivStyle}
            >
              {hoveredButton === 'createChannel' ? (
                <span
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                  }}
                >
                  Create New Channel
                </span>
              ) : (
                <img
                  src={createChannelIcon}
                  alt='Create Channel'
                  style={{
                    width: '3rem',
                  }}
                />
              )}
            </div>
            <div
              onMouseEnter={() => handleMouseEnter('channels')}
              onMouseLeave={handleMouseLeave}
              onClick={handleShowChannels}
              style={iconDivStyle}
            >
              {hoveredButton === 'channels' ? (
                <span
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    paddingTop: '2rem',
                    paddingBottom: '2rem',
                  }}
                >
                  Channels
                </span>
              ) : (
                <img
                  src={channelsIcon}
                  alt='Channels'
                  style={{
                    width: '3rem',
                  }}
                />
              )}
            </div>
          </Container>

          <Offcanvas
            show={showConnections}
            onHide={handleCloseConnections}
            placement='start'
            style={{ paddingTop: '5rem' }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Connections</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ConnectionsList
                channels={channels}
                handleChannelClick={handleChannelClick}
              />
            </Offcanvas.Body>
          </Offcanvas>

          <Offcanvas
            show={showCreateChannel}
            onHide={handleCloseCreateChannel}
            placement='start'
            style={{ paddingTop: '5rem' }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Create New Channel</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Card.Body>
                <CreateChannel />
              </Card.Body>
            </Offcanvas.Body>
          </Offcanvas>

          <Offcanvas
            show={showChannels}
            onHide={handleCloseChannels}
            placement='start'
            style={{ paddingTop: '5rem' }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Channels</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {channels && channels.length ? (
                <ChannelsList
                  channels={channels}
                  handleChannelClick={handleChannelClick}
                />
              ) : (
                <p>No channels available</p>
              )}
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      )}
    </div>
  )
}
