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
import { useState } from 'react'
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
      const username = decoded.username
      const email = decoded.email
      return { userId, username, email }
    } catch (error) {
      console.error('Invalid token:', error)
      return null
    }
  }

  const userData = decodeToken(token)
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

  //UI toggles
  const [showConnections, setShowConnections] = useState(false)
  const [showCreateChannel, setShowCreateChannel] = useState(false)
  const [showChannels, setShowChannels] = useState(false)

  const handleCloseConnections = () => setShowConnections(false)
  const handleShowConnections = () => setShowConnections(true)

  const handleCloseCreateChannel = () => setShowCreateChannel(false)
  const handleShowCreateChannel = () => setShowCreateChannel(true)

  const handleCloseChannels = () => setShowChannels(false)
  const handleShowChannels = () => setShowChannels(true)

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
        <div style={{ display: 'flex', paddingTop: '5rem' }}>
          <Container
            className='p-4 bg-light'
            style={{ width: '250px', borderRight: '1px solid #ddd' }}
          >
            <Card className='mb-4 text-center'>
              <Card.Body>
                <img
                  src={profileIcon}
                  alt='Profile'
                  style={{ width: '5rem', borderRadius: '50%' }}
                />
                <h3>{userData.username}</h3>
                <p>{userData.email}</p>
              </Card.Body>
            </Card>
            <Button
              variant='primary'
              onClick={handleShowConnections}
              className='w-100 mb-2'
            >
              Connections
            </Button>
            <Button
              variant='primary'
              onClick={handleShowCreateChannel}
              className='w-100 mb-2'
            >
              Create New Channel
            </Button>
            <Button
              variant='primary'
              onClick={handleShowChannels}
              className='w-100'
            >
              Channels
            </Button>
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
              <Card.Body>
                <ul style={{ overflowY: 'auto', height: '25vh' }}>
                  {channels
                    .filter((channel) => channel.members.length < 3)
                    .map((channel) => (
                      <li
                        key={channel._id}
                        style={{ marginBottom: '1rem', height: '7vh' }}
                      >
                        <ChannelCard
                          channelId={channel._id}
                          title={channel.title}
                          members={channel.members}
                          onChannelClick={handleChannelClick}
                        />
                      </li>
                    ))}
                </ul>
              </Card.Body>
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
                <ListGroup style={{ overflowY: 'auto', height: '50vh' }}>
                  {channels
                    .filter((channel) => channel.members.length > 2)
                    .map((channel) => (
                      <ListGroupItem
                        key={channel._id}
                        style={{ marginBottom: '1rem' }}
                      >
                        <ChannelCard
                          channelId={channel._id}
                          title={channel.title}
                          members={channel.members}
                          onChannelClick={handleChannelClick}
                        />
                      </ListGroupItem>
                    ))}
                </ListGroup>
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
