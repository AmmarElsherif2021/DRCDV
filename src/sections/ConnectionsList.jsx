/* eslint-disable react/prop-types */
import { Card } from 'react-bootstrap'
import { ChannelCard } from '../Components/Channels/ChannelCard'
// eslint-disable-next-line react/prop-types
export function ConnectionsList({ channels, handleChannelClick }) {
  return (
    <Card.Body>
      <ul style={{ overflowY: 'auto', height: '72vh' }}>
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
  )
}
