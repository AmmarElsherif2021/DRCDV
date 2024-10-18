import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, Container, Alert, Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useSocket } from '../../contexts/SocketContext'
import { jwtDecode } from 'jwt-decode'

// eslint-disable-next-line react/prop-types
export function CreateMessage({ channelId }) {
  const [text, setText] = useState('')
  const [attachments, setAttachments] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [token] = useAuth()
  const socket = useSocket()
  const queryClient = useQueryClient()
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const decodeToken = (token) => {
      if (!token || typeof token !== 'string') {
        console.error('Invalid token:', 'Token must be a valid string')
        return null
      }
      try {
        const decoded = jwtDecode(token)
        return decoded.sub // Return user ID
      } catch (error) {
        console.error('Invalid token:', error)
        return null
      }
    }
    setUserId(decodeToken(token))
  }, [token])

  useEffect(() => {
    const handleMessageCreated = (msg) => {
      console.log('Message created:', msg) // Debug log
      queryClient.invalidateQueries(['messages', channelId])
      setText('') // Reset text input
      setAttachments([]) // Reset attachments
      setShowAlert(true) // Show success alert
      // Hide the alert after 2 seconds
      setTimeout(() => {
        setShowAlert(false)
      }, 2000)
    }

    if (socket) {
      socket.on('messageCreated', handleMessageCreated)
      console.log('Added socket listener for messageCreated') // Debug log
    }

    return () => {
      if (socket) {
        socket.off('messageCreated', handleMessageCreated)
        console.log('Removed socket listener for messageCreated') // Debug log
      }
    }
  }, [socket, channelId, queryClient])

  const createMessageMutation = useMutation({
    mutationFn: () => {
      if (socket && userId) {
        console.log('Emitting createMessage') // Debug log
        socket.emit('createMessage', {
          userId,
          channelId,
          messageData: { text, attachments },
        })
      }
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (createMessageMutation.isPending) return // Prevent multiple submits
    createMessageMutation.mutate()
  }

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files)
    const filePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          resolve({
            filename: file.name,
            contentType: file.type,
            data: reader.result.split(',')[1], // Extract the base64 part of the data URL
          })
        }
        reader.onerror = reject
        reader.readAsDataURL(file) // Read the file as a data URL to get base64 data
      })
    })
    Promise.all(filePromises)
      .then((fileData) => {
        console.log('File data:', fileData) // Debugging line to check file data
        setAttachments(fileData)
      })
      .catch((error) => console.error('Error reading files:', error))
  }

  return (
    <Container className='p-4'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='messageInput' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Type your message...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Form.Group controlId='fileInput' className='mb-3 '>
            <Form.Control
              type='file'
              multiple
              onChange={handleAttachmentChange}
            />
          </Form.Group>
          <Button
            variant='primary'
            type='submit'
            disabled={!text || createMessageMutation.isPending}
            className='w-20'
            style={{ backgroundColor: 'black', color: '#1ccb8f' }}
          >
            {createMessageMutation.isPending ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
        {showAlert && (
          <Alert variant='success' className='mt-3'>
            Message sent successfully!
          </Alert>
        )}
      </Form>
    </Container>
  )
}
