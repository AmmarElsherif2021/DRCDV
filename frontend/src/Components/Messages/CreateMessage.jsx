import { useState } from 'react'
import { Form, Container, Alert, Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useMessageManagement } from './useMessageManagement'
import { Paperclip } from 'lucide-react'

const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024 // 5 MB

export const CreateMessage = ({ channelId }) => {
  const [showAlert, setShowAlert] = useState(false)
  const [showSizeAlert, setShowSizeAlert] = useState(false)
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
          if (file.size > MAX_ATTACHMENT_SIZE) {
            setShowSizeAlert(true)
            setTimeout(() => setShowSizeAlert(false), 2000)
            reject(new Error('File size exceeds the limit.'))
          }

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
      className='p-2 d-flex flex-column gap-2'
      style={{
        height: 'auto',
        margin: '0.3rem',
        padding: 0,
      }}
    >
      <Form onSubmit={handleSubmit}>
        {showAlert && (
          <Alert variant='success' className='mb-2'>
            Message sent successfully!
          </Alert>
        )}
        {showSizeAlert && (
          <Alert variant='danger' className='mb-2'>
            Attachment size exceeds the limit of{' '}
            {MAX_ATTACHMENT_SIZE / (1024 * 1024)} MB.
          </Alert>
        )}
        <Form.Group controlId='messageInput' className='mb-2'>
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
          className='d-flex flex-column flex-md-row align-items-center gap-2'
        >
          <Form.Control
            type='file'
            multiple
            onChange={handleAttachmentChange}
            style={{ cursor: 'pointer' }}
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
        {attachments.length > 0 &&
          attachments.map((attachment, index) => (
            <div key={index} className='d-flex align-items-center gap-2 mt-2'>
              <Paperclip color='#1CCB8F' size={20} />
              <span>{attachment.filename}</span>
            </div>
          ))}
      </Form>
    </Container>
  )
}
