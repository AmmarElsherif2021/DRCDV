import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useSocket } from '../../contexts/SocketContext'
import { jwtDecode } from 'jwt-decode'

// eslint-disable-next-line react/prop-types
export function CreateMessage({ channelId }) {
  // Pass channelId as prop
  const [text, setText] = useState('') // State for the message text
  const [attachments, setAttachments] = useState([]) // State for the message attachments
  const [token] = useAuth() // Fetch token from AuthContext
  const socket = useSocket() // Get the socket instance

  const queryClient = useQueryClient() // Initialize the query client

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

  const userId = decodeToken(token)

  const createMessageMutation = useMutation({
    mutationFn: () => {
      if (socket && userId) {
        socket.emit('createMessage', {
          userId,
          channelId,
          messageData: { text, attachments },
        })
      }
    }, // Emit createMessage event through socket
    onSuccess: () => queryClient.invalidateQueries(['messages', channelId]), // Invalidate the 'messages' query on success to refetch the messages
  })

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent the default form submission behavior
    createMessageMutation.mutate() // Trigger the mutation to create a message
  }

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      filename: file.name,
      contentType: file.type,
      gridfsId: null, // Placeholder, as gridfsId will be set on the server side
    }))
    setAttachments(files) // Update the attachments state on file input change
  }

  return (
    <Container className='p-4'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='create-text'>
          <Form.Label>Text:</Form.Label>
          <Form.Control
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)} // Update the text state on input change
          />
        </Form.Group>
        <Form.Group controlId='create-attachments' className='mt-3'>
          <Form.Label>Attachments:</Form.Label>
          <Form.Control
            type='file'
            multiple
            onChange={handleAttachmentChange} // Update the attachments state on file input change
          />
        </Form.Group>
        <Button
          type='submit'
          variant='primary'
          className='mt-3'
          disabled={!text || createMessageMutation.isPending} // Disable button if text is empty or mutation is pending
        >
          {createMessageMutation.isPending ? 'Creating...' : 'Create'}{' '}
          {/* Change button text based on mutation state */}
        </Button>
        {createMessageMutation.isSuccess && (
          <Alert variant='success' className='mt-3'>
            Message created successfully!
          </Alert>
        )}
      </Form>
    </Container>
  )
}
