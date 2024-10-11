import { User } from '../Components/User/User'
import { CreateChannel } from '../Components/channels/CreateChannel'
import { Fragment } from 'react'
import { ChannelCard } from '../Components/channels/ChannelCard'
import { listChannels } from '../API/channels'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'

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
    queryFn: () => {
      listChannels({})
    },
  })
  const channels = channelsQuery.data ?? []
  return (
    <div className='p-4 bg-gray-100 w-full md:w-1/3 md:block'>
      <h1 className='text-xl font-bold'>Personal information</h1>
      <User id={userData?.userId} />
      <h1 className='text-xl font-bold mt-4'>Create new Channel</h1>
      <CreateChannel />
      {channels && channels.length ? (
        channels.map((channel) => (
          <Fragment key={channel._id}>
            <ChannelCard
              channelId={channel._id}
              title={channel.title}
              members={channel.members}
            />
          </Fragment>
        ))
      ) : (
        <p>none of channels</p>
      )}
    </div>
  )
}
