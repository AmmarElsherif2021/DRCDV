import Stack from 'react-bootstrap/Stack'
import PropTypes from 'prop-types'
import PersonIcon from '../assets/person-icon.svg'
import { useQuery } from '@tanstack/react-query'
import { listChannels } from '../API/channels'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export function ConnectionsList({ users }) {
  const [token] = useAuth()

  // Fetch the list of channels
  const {
    data: channels,
    isLoading,
    isError,
  } = useQuery(['channels', { token }], () => listChannels({ token }))

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading channels</div>
  }

  return (
    <Stack gap={3} style={{ height: '20vh', overflowY: 'auto' }}>
      {users.map((user) => {
        // Check if a channel exists with this user
        const existingChannel = channels.find((channel) =>
          channel.members.some((member) => member.user === user._id),
        )

        return (
          <div key={user._id} style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={PersonIcon}
              alt='Person Icon'
              style={{ marginRight: '1vw', width: '2vw' }}
            />
            <small style={{ marginRight: '1vw' }}>{user.username}</small>
            <Link
              to={`/channels/${existingChannel?._id}`}
              style={{ marginLeft: 'auto' }}
            >
              {existingChannel ? 'Open Channel' : 'Create Channel'}
            </Link>
          </div>
        )
      })}
    </Stack>
  )
}

ConnectionsList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  ).isRequired,
}
