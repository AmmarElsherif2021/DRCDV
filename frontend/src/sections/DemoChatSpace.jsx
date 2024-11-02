Updated ChatSpace Component

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Container,
  Row,
  Col,
  Spinner,
  Image,
  Dropdown,
} from 'react-bootstrap'
import { ProfileImage } from '../Components/User/ProfileImage'
import { CreateMessage } from '../Components/Messages/CreateMessage'
import { getChannelById } from '../API/channels'
import { getMessagesByChannelId } from '../API/messages'
import { useAuth } from '../contexts/AuthContext'
import { useChannel } from '../contexts/ChannelContext'
import { useSocket } from '../contexts/SocketContext'
import Lottie from 'react-lottie'
import { jwtDecode } from 'jwt-decode'
import MessagingList from '../Components/Messages/MessageList'
import { User } from '../Components/User/User'
import channelAvatar from '../assets/group-icon.svg'
import sendGif from '../assets/startSending.json'

export const ChatSpace = ({ channelId }) => {
  const [token] = useAuth()
  const socket = useSocket()
  const {
    selectedChannel,
    setSelectedChannel,
    channelMessages,
    setChannelMessages,
    channelMembers,
    setChannelMembers,
  } = useChannel()

  const currentUserId = token ? jwtDecode(token).sub : null

  const { data: channelData, isLoading: isChannelLoading } = useQuery({
    queryKey: ['channel', { channelId }],
    queryFn: () => getChannelById(channelId, token),
    enabled: !!channelId,
    onSuccess: (data) => {
      setSelectedChannel(data)
      if (data?.members) {
        setChannelMembers(data.members)
      }
    }
  })

  const { data: messagesData, isLoading: isMessagesLoading } = useQuery({
    queryKey: ['messages', { channelId }],
    queryFn: () => getMessagesByChannelId(channelId, token),
    enabled: !!channelId,
    onSuccess: (data) => {
      setChannelMessages(data)
    }
  })

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (msg) => {
        setChannelMessages((prevMessages) => [...prevMessages, msg])
      }
      socket.on('messageCreated', handleNewMessage)
      return () => {
        socket.off('messageCreated', handleNewMessage)
      }
    }
  }, [socket, setChannelMessages])

  const sendMessage = (msg) => {
    if (socket) {
      socket.emit('createMessage', {
        userId: currentUserId,
        channelId,
        messageData: { text: msg, attachments: [] },
      })
    }
  }

  if (!channelId) {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: sendGif,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }

    return (
      <div className="flex flex-col items-center justify-center w-[87%] h-[90%] absolute right-4 p-4 text-center">
        <div className="relative w-[30%] h-auto z-0 overflow-hidden">
          <Lottie options={defaultOptions} />
        </div>
        <h1 className="text-5xl font-normal text-black">
          Navigate to connections or channels and start messaging
        </h1>
      </div>
    )
  }

  if (isChannelLoading || isMessagesLoading) {
    return <Spinner animation="border" role="status" />
  }

  const ChannelTitle = selectedChannel?.title ? (
    <div className="flex flex-row items-center pt-4 pl-4" style={{ width: '10rem' }}>
      {channelMembers.length > 2 ? (
        <Image src={channelAvatar} alt="Channel" style={{ width: '5rem' }} />
      ) : (
        <ProfileImage
          userId={selectedChannel.title.split(',').filter(x => x !== currentUserId)[0]}
          size={40}
          showStatus={true}
        />
      )}
      <Dropdown>
        <Dropdown.Toggle variant="link" id="dropdown-basic" className="text-lg text-black">
          <User
            id={selectedChannel.title.split(',').filter(x => x !== currentUserId)[0]}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {channelMembers.map(member =>
            member.user !== currentUserId && (
              <Dropdown.Item key={member.user}>
                <User id={member.user} showEmail={true} />
              </Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ) : null

  return (
    <Container fluid className="relative -left-[16%] top-4 h-[90%] w-[110%] m-0">
      <Row>
        <Col>
          <div className="flex justify-between items-center mb-3">
            {ChannelTitle}
          </div>
          <MessagingList
            messages={channelMessages}
            currentUserId={currentUserId}
            channelMembers={channelMembers}
            isLoading={isChannelLoading || isMessagesLoading}
          />
          <CreateMessage channelId={channelId} sendMessage={sendMessage} />
        </Col>
      </Row>
    </Container>
  )
}

export default ChatSpace