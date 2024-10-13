import Stack from 'react-bootstrap/Stack'
import PropTypes from 'prop-types'
import PersonIcon from '../assets/person-icon.svg'

export function ConnectionsList({ users }) {
  return (
    <Stack gap={3} style={{ height: '20vh', overflowY: 'auto' }}>
      {users.map((user) => (
        <div key={user._id} style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={PersonIcon}
            alt='Person Icon'
            style={{ marginRight: '8px' }}
          />
          <small>{user.username}</small>
        </div>
      ))}
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
