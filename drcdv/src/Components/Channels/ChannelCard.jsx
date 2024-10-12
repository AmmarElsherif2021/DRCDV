import PropTypes from 'prop-types'
import { Card, ListGroup } from 'react-bootstrap'

export function ChannelCard({ channelId, title, members }) {
  return (
    <Card style={{ margin: '1vw', width: '15vw' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>{channelId}</Card.Subtitle>
        <ListGroup variant='flush'>
          {members.map((member, index) => (
            <ListGroup.Item key={index}>
              {member.user} -- {member.role}
            </ListGroup.Item>
          ))}
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
  ),
}
