import PropTypes from 'prop-types'
export function ChannelCard({ channelId, title, members }) {
  return (
    <div style={{ margin: '1vw', width: '15vw', border: 'solid' }}>
      <h3>{title}</h3>
      <p>{channelId}</p>
      <div>{members}</div>
    </div>
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
