import PropTypes from 'prop-types'
import { Card, ListGroup } from 'react-bootstrap'
import groupIcon from '../../assets/person-icon.svg'
import personIcon from '@/assets/person-icon.svg'
import { User } from '../User/User'
import { useAuth } from '../../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
export function ChannelCard({ channelId, title, members, onChannelClick }) {
  const [token] = useAuth()
  const decodeToken = (token) => {
    if (!token || typeof token !== 'string') {
      return null
    }
    try {
      const decoded = jwtDecode(token)
      const userId = decoded.sub
      return { userId }
    } catch (error) {
      return null
    }
  }

  const userData = decodeToken(token)

  return (
    <Card
      onClick={() => onChannelClick(channelId)} // Trigger on click
      style={{
        margin: '1rem',
        maxWidth: '20rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
      }}
      index={channelId}
    >
      <Card.Body>
        <Card.Title>
          {members.length > 2 ? (
            <img
              src={groupIcon}
              alt='group Icon'
              style={{ marginRight: '0.5rem', width: '1.5rem' }}
            />
          ) : (
            <img
              src={personIcon}
              alt='person Icon'
              style={{ marginRight: '0.5rem', width: '1.5rem' }}
            />
          )}
          {members.length > 2 ? (
            title
          ) : (
            <User
              id={title.split(',').filter((x) => x !== userData.userId)[0]}
            />
          )}
        </Card.Title>
        <ListGroup
          variant='flush'
          style={{
            maxHeight: '10rem',
            overflowY: 'auto',
          }}
        >
          {members.length > 2 && (
            <p>
              <hr />
              <User id={members[0].user} /> {`and ${members.length - 1} others`}
            </p>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

ChannelCard.propTypes = {
  channelId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string.isRequired,
      role: PropTypes.oneOf(['admin', 'guest']).isRequired,
    }),
  ).isRequired,
  onChannelClick: PropTypes.func.isRequired,
}
