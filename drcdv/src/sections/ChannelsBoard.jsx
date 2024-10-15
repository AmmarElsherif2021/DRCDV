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
import { User } from '../Components/User/User'
import { CreateChannel } from '../Components/Channels/CreateChannel'
import { ChannelCard } from '../Components/Channels/ChannelCard'
import { useChannel } from '../contexts/ChannelContext'

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
      const userId = decoded.sub // Extracting 'sub' for user ID
      return { userId }
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
      //console.log('Token:', token) // Debugging log to ensure token is correct
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
            zIndex: 1000,
          }}
        >
          <h1>WELCOME TO DRCDV</h1>
          <hr />
          <p>Add connections and enjoy messaging</p>
          <Button onClick={handleCreateChannels}>Add Connections</Button>
        </div>
      ) : (
        <Container className='p-4 bg-light'>
          <Card className='mb-4'>
            <Card.Body>
              <div className='h4 mb-3 font-weight-bold'>Connections</div>
              <User id={userData.userId} />
            </Card.Body>
          </Card>
          <Card className='mb-4'>
            <Card.Body>
              <h1 className='h4 mb-3 font-weight-bold'>Create New Channel</h1>
              <CreateChannel />
            </Card.Body>
          </Card>

          <h1 className='h4 mb-3 font-weight-bold'>Channels</h1>

          {channels && channels.length ? (
            <ListGroup
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                whiteSpace: 'nowrap',
                height: '50vh',
              }}
            >
              {channels.map((channel) => (
                <ListGroupItem
                  key={channel._id}
                  style={{ flex: '0 0 auto', marginRight: '1rem' }}
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
