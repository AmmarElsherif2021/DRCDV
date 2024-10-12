import { User } from '../Components/User/User'
import { CreateChannel } from '../Components/channels/CreateChannel'
import { ChannelCard } from '../Components/channels/ChannelCard'
import { listChannels } from '../API/channels'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { Container, Card } from 'react-bootstrap'

export function ChannelsBoard() {
  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token)
      const userId = decoded.sub // Assuming 'sub' contains the user ID
      const userName = decoded.name // Assuming 'name' contains the username
      return { userId, userName }
    } catch (error) {
      console.error('Invalid token:', error)
      return null
    }
  }

  const [token] = useAuth()
  const userData = decodeToken(token)
  const channelsQuery = useQuery({
    queryKey: ['channels', {}],
    queryFn: () => listChannels({}),
  })
  const channels = channelsQuery.data ?? []

  return (
    <Container className='p-4 bg-light'>
      <Card className='mb-4'>
        <Card.Body>
          <p className='h4 mb-3 font-weight-bold'>Personal Information</p>
          <User id={userData?.userId} />
        </Card.Body>
      </Card>
      <Card className='mb-4'>
        <Card.Body>
          <h1 className='h4 mb-3 font-weight-bold'>Create New Channel</h1>
          <CreateChannel />
        </Card.Body>
      </Card>
      <Card className='mb-4'>
        <Card.Body>
          <h1 className='h4 mb-3 font-weight-bold'>Channels</h1>
          {channels && channels.length ? (
            channels.map((channel) => (
              <Card key={channel._id} className='mb-3'>
                <Card.Body>
                  <ChannelCard
                    channelId={channel._id}
                    title={channel.title}
                    members={channel.members}
                  />
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No channels available</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}
