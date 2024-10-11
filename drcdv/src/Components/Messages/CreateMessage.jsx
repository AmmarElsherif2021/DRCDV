import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createMessage } from '../../API/messages'
import { useAuth } from '../../contexts/AuthContext'

export function CreateMessage() {
  // State hooks to manage the form inputs
  const [text, setText] = useState('') // State for the message text
  const [attachments, setAttachments] = useState([]) // State for the message attachments
  const [token] = useAuth()
  // Initialize the query client
  const queryClient = useQueryClient()

  // Define the mutation for creating a message
  const createMessageMutation = useMutation({
    mutationFn: () => createMessage(token, { text, attachments }), // Function to call the createMessage API
    onSuccess: () => queryClient.invalidateQueries(['messages']), // Invalidate the 'messages' query on success to refetch the messages
  })

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent the default form submission behavior
    createMessageMutation.mutate() // Trigger the mutation to create a message
  }

  // Handle attachment changes
  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      filename: file.name,
      contentType: file.type,
      gridfsId: null, // Placeholder, as gridfsId will be set on the server side
    }))
    setAttachments(files)
  }

  //if (!token) return <div>Please log in to create new messages.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-text'>Text: </label>
        <input
          type='text'
          name='create-text'
          id='create-text'
          value={text}
          onChange={(e) => setText(e.target.value)} // Update the text state on input change
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-attachments'>Attachments: </label>
        <input
          type='file'
          name='create-attachments'
          id='create-attachments'
          multiple
          onChange={handleAttachmentChange} // Update the attachments state on file input change
        />
      </div>
      <br />
      <input
        type='submit'
        value={createMessageMutation.isPending ? 'Creating...' : 'Create'} // Change button text based on mutation state
        disabled={!text || createMessageMutation.isPending} // Disable button if text is empty or mutation is pending
      />
      {createMessageMutation.isSuccess ? (
        <>
          <br />
          Message created successfully!
        </>
      ) : null}
    </form>
  )
}
