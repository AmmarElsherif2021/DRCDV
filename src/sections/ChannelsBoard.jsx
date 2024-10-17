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
} from 'react-bootstrap'
import { CreateChannel } from '../Components/Channels/CreateChannel'
import { ChannelCard } from '../Components/Channels/ChannelCard'
import { useChannel } from '../contexts/ChannelContext'
import profileIcon from '../assets/profile.svg'
import { User } from '../Components/User/User'
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
        <Container className='p-4 bg-light'>
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
          <Card className='mb-4'>
            <Card.Body>
              <h4 className='font-weight-bold'>Connections</h4>
              <ul style={{ overflowY: 'auto', height: '25vh' }}>
                {channels
                  .filter((channel) => channel.members.length < 3)
                  .map((channel) => (
                    <li
                      key={channel._id}
                      style={{
                        marginBottom: '1rem',

                        height: '7vh',
                      }}
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
          </Card>
          <Card className='mb-4'>
            <Card.Body>
              <h4 className='font-weight-bold'>Create New Channel</h4>
              <CreateChannel />
            </Card.Body>
          </Card>
          <h4 className='font-weight-bold'>Channels</h4>
          {channels && channels.length ? (
            <ListGroup
              style={{
                overflowY: 'auto',
                height: '50vh',
              }}
            >
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
        </Container>
      )}
    </div>
  )
}
