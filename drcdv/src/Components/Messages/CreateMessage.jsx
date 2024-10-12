import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createMessage } from '../../API/messages'
import { useAuth } from '../../contexts/AuthContext'
import { Form, Button, Container, Alert } from 'react-bootstrap'

export function CreateMessage() {
  const [text, setText] = useState('') // State for the message text
  const [attachments, setAttachments] = useState([]) // State for the message attachments
  const [token] = useAuth() // Fetch token from AuthContext

  const queryClient = useQueryClient() // Initialize the query client

  const createMessageMutation = useMutation({
    mutationFn: () => createMessage(token, { text, attachments }), // Function to call the createMessage API
    onSuccess: () => queryClient.invalidateQueries(['messages']), // Invalidate the 'messages' query on success to refetch the messages
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
