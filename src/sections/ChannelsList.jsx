/* eslint-disable react/prop-types */

import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { ChannelCard } from '../Components/Channels/ChannelCard'
//import { useQueryClient } from '@tanstack/react-query';

export function ChannelsList({ channels, handleChannelClick }) {
  //const queryClient = useQueryClient();
  return (
    <ListGroup style={{ overflowY: 'auto', height: '72vh' }}>
      {channels
        .filter((channel) => channel.members.length > 2)
        .map((channel) => (
          <ListGroupItem key={channel._id} style={{ marginBottom: '1rem' }}>
            <ChannelCard
              channelId={channel._id}
              title={channel.title}
              members={channel.members}
              onChannelClick={handleChannelClick}
            />
          </ListGroupItem>
        ))}
    </ListGroup>
  )
}
