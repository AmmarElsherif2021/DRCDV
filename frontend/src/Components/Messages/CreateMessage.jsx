import { useState } from 'react'
import { Form, Container, Alert, Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useMessageManagement } from './useMessageManagement'
import { Paperclip } from 'lucide-react'

export const CreateMessage = ({ channelId }) => {
  const [showAlert, setShowAlert] = useState(false)
  const [token] = useAuth()

  // Use the message management hook
  const { text, setText, attachments, setAttachments, sending, sendMessage } =
    useMessageManagement(channelId, token)

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!sending && text.trim()) {
      try {
        await sendMessage({
          text,
          attachments,
          channel: channelId,
        })

        // Show success alert
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 2000)
      } catch (error) {
        console.error('Failed to send message:', error)
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
    <Container
      className='p-4 d-flex flex-column gap-3'
      style={{
        height: 'auto',
        //backgroundColor: '#9ddaad',
        margin: '0.3rem',
        padding: 0,
      }}
    >
      <Form onSubmit={handleSubmit}>
        {showAlert && (
          <Alert variant='success' style={{ height: '2rem', padding: 0 }}>
            Message sent successfully!
          </Alert>
        )}
        <div className='d-flex align-items-center gap-3'>
          <Form.Group controlId='messageInput' className='mb-0 flex-grow-1'>
            <Form.Control
              type='text'
              placeholder='Type your message...'
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Form.Group>
          <Form.Group
            controlId='fileInput'
            className='mb-0 d-flex align-items-center gap-3'
          >
            <Form.Control
              type='file'
              multiple
              onChange={handleAttachmentChange}
              style={{ cursor: 'pointer', width: '20vw' }}
            />
            <Button
              variant='primary'
              type='submit'
              disabled={!text.trim() || sending}
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
          </Form.Group>
        </div>
        {attachments.length > 0 &&
          attachments?.map((x) => (
            <div className='d-flex align-items-center gap-2 mt-2'>
              <Paperclip color='#1CCB8F' size={20} />
              <span>{x.filename} </span>
            </div>
          ))}
      </Form>
    </Container>
  )
}
