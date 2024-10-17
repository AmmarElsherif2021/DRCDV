import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Form,
  Container,
  Alert,
  InputGroup,
  SplitButton,
  Dropdown,
} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useSocket } from '../../contexts/SocketContext'
import { jwtDecode } from 'jwt-decode'

export function CreateMessage({ channelId }) {
  const [text, setText] = useState('') // State for the message text
  const [attachments, setAttachments] = useState([]) // State for the message attachments
  const [showAlert, setShowAlert] = useState(false) // State to control the alert visibility
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
    onSuccess: () => {
      queryClient.invalidateQueries(['messages', channelId]) // Invalidate the 'messages' query on success to refetch the messages
      setText('') // Reset text input
      setAttachments([]) // Reset attachments
      setShowAlert(true) // Show success alert

      // Hide the alert after 2 seconds
      setTimeout(() => {
        setShowAlert(false)
      }, 2000)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent the default form submission behavior
    createMessageMutation.mutate() // Trigger the mutation to create a message
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
            data: reader.result.split(',')[1], // Ensure data is in base64 format
          })
        }
        reader.onerror = reject
        reader.readAsDataURL(file) // Read file as data URL to get base64 data
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
        <InputGroup className='mb-3'>
          <Form.Control
            aria-label='Text input with dropdown button'
            type='text'
            placeholder='Type your message...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <SplitButton
            variant='outline-secondary'
            title={
              createMessageMutation.isPending ? 'Sending...' : 'Send Message'
            }
            type='submit'
            id='segmented-button-dropdown-1'
            disabled={!text || createMessageMutation.isPending} // Disable button if text is empty or mutation is pending
          >
            <Dropdown.Divider />
            <Dropdown.Item as='label'>
              <Form.Control
                type='file'
                multiple
                onChange={handleAttachmentChange}
                style={{ display: 'none' }}
              />
              Select Files
            </Dropdown.Item>
          </SplitButton>
        </InputGroup>
        {showAlert && (
          <Alert variant='success' className='mt-3'>
            Message sent successfully!
          </Alert>
        )}
      </Form>
    </Container>
  )
}
