import { useState, useEffect, useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Form, Container, Alert, Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useSocket } from '../../contexts/SocketContext'
import { useChannel } from '../../contexts/ChannelContext'
import { jwtDecode } from 'jwt-decode'
import { Paperclip } from 'lucide-react'

export function CreateMessage({ channelId }) {
  const [text, setText] = useState('')
  const [attachments, setAttachments] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [token] = useAuth()
  const socket = useSocket()
  const [userId, setUserId] = useState(null)
  const [sending, setSending] = useState(false)

  // Get channel context values
  const { channelMembers, channelMessages, setChannelMessages } = useChannel()

  // Decode user ID from token
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUserId(decoded.sub)
      } catch (error) {
        console.error('Invalid token:', error)
      }
    }
  }, [token])

  // Handle successful message creation from server
  const handleMessageCreated = useCallback(
    (msg) => {
      setChannelMessages((prevMessages) => {
        // Remove temporary message and add confirmed message
        const updatedMessages = prevMessages.filter(
          (m) => !m.pending || m._id !== `temp-${msg.tempId}`,
        )
        return [...updatedMessages, msg]
      })

      setText('')
      setAttachments([])
      setShowAlert(true)
      setSending(false)
      setTimeout(() => setShowAlert(false), 2000)
    },
    [setChannelMessages],
  )

  // Setup socket listener for message confirmation
  useEffect(() => {
    if (socket) {
      socket.on('messageCreated', handleMessageCreated)
      return () => {
        socket.off('messageCreated', handleMessageCreated)
      }
    }
  }, [socket, handleMessageCreated])

  // Create message mutation
  const createMessageMutation = useMutation({
    mutationFn: () => {
      if (socket && userId && !sending) {
        const tempId = Date.now()
        const currentUser = channelMembers.find((m) => m._id === userId)

        // Create temporary message
        const tempMessage = {
          _id: `temp-${tempId}`,
          text,
          attachments,
          sender: {
            _id: userId,
            username: currentUser?.username || 'You',
            profileImage: currentUser?.profileImage,
          },
          channelId,
          createdAt: new Date().toISOString(),
          pending: true,
          tempId,
        }

        // Update context with temporary message
        setChannelMessages((prevMessages) => [...prevMessages, tempMessage])

        // Emit socket event
        socket.emit('createMessage', {
          userId,
          channelId,
          messageData: {
            text,
            attachments,
            channel: channelId,
            tempId,
          },
        })

        setSending(true)
      }
    },
    onError: (error) => {
      setSending(false)
      // Remove temporary message on error
      setChannelMessages((prevMessages) =>
        prevMessages.filter((m) => !m.pending),
      )
      console.error('Failed to send message:', error)
    },
  })

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!sending && !createMessageMutation.isPending && text.trim()) {
      try {
        setSending(true)
        const tempId = Date.now()

        // Create temporary message
        const tempMessage = {
          _id: `temp-${tempId}`,
          text,
          attachments,
          sender: {
            _id: userId,
            username:
              channelMembers.find((m) => m._id === userId)?.username || 'You',
          },
          channelId,
          createdAt: new Date().toISOString(),
          pending: true,
          tempId,
        }

        // Add temporary message to state
        setChannelMessages((prev) => [...prev, tempMessage])

        // Emit socket event
        socket.emit('createMessage', {
          userId,
          channelId,
          messageData: {
            text,
            attachments,
            channel: channelId,
            tempId,
          },
        })

        // Clear form
        setText('')
        setAttachments([])
      } catch (error) {
        console.error('Failed to send message:', error)
        // Remove temporary message on error
        setChannelMessages((prev) => prev.filter((m) => !m.pending))
      } finally {
        setSending(false)
      }
    }
  }
  // Handle file attachments
  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files)
    const filePromises = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () =>
            resolve({
              filename: file.name,
              contentType: file.type,
              data: reader.result.split(',')[1],
            })
          reader.onerror = reject
          reader.readAsDataURL(file)
        }),
    )
    Promise.all(filePromises)
      .then(setAttachments)
      .catch((error) => console.error('Error reading files:', error))
  }

  return (
    <Container className='p-4 d-flex flex-column gap-3'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='messageInput' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Type your message...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <div className='d-flex flex-column flex-md-row gap-3'>
          <div className='flex-grow-1'>
            <Form.Group controlId='fileInput' className='mb-0'>
              <div className='d-flex align-items-center gap-3'>
                <Form.Control
                  type='file'
                  multiple
                  onChange={handleAttachmentChange}
                  style={{ cursor: 'pointer' }}
                />
                <Button
                  variant='primary'
                  type='submit'
                  disabled={
                    !text.trim() || sending || createMessageMutation.isPending
                  }
                  style={{
                    backgroundColor: '#1CCB8F',
                    color: 'black',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    minWidth: '100px',
                  }}
                >
                  {sending ? 'Sending...' : 'Send'}
                </Button>
              </div>
              {attachments.length > 0 && (
                <div className='d-flex align-items-center gap-2 mt-2'>
                  <Paperclip color='#1CCB8F' size={20} />
                  <span>{attachments.length} attachment(s)</span>
                </div>
              )}
            </Form.Group>
          </div>
        </div>
      </Form>
      {showAlert && (
        <Alert variant='success' className='mt-3'>
          Message sent successfully!
        </Alert>
      )}
    </Container>
  )
}
