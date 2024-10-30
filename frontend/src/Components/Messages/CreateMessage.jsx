/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, Container, Alert, Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useSocket } from '../../contexts/SocketContext'
import { jwtDecode } from 'jwt-decode'
import { Paperclip } from 'lucide-react'

export function CreateMessage({ channelId }) {
  const [text, setText] = useState('')
  const [attachments, setAttachments] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [token] = useAuth()
  const socket = useSocket()
  const queryClient = useQueryClient()
  const [userId, setUserId] = useState(null)
  const [sending, setSending] = useState(false)

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

  const handleMessageCreated = useCallback(
    (msg) => {
      console.log('Message created:', msg)
      queryClient.invalidateQueries(['messages', channelId])
      setText('')
      setAttachments([])
      setShowAlert(true)
      setSending(false)
      setTimeout(() => setShowAlert(false), 2000)
    },
    [channelId, queryClient],
  )

  useEffect(() => {
    if (socket) {
      socket.on('messageCreated', handleMessageCreated)
      console.log('Added socket listener for messageCreated')
      return () => {
        socket.off('messageCreated', handleMessageCreated)
        console.log('Removed socket listener for messageCreated')
      }
    }
  }, [socket, handleMessageCreated])

  const createMessageMutation = useMutation({
    mutationFn: () => {
      if (socket && userId && !sending) {
        console.log('Emitting createMessage')
        socket.emit('createMessage', {
          userId,
          channelId,
          messageData: { text, attachments, channel: channelId },
        })
        setSending(true)
      }
    },
    onError: () => {
      setSending(false)
    },
    onSettled: () => {
      setText('')
      setAttachments([])
      setSending(false)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!sending && !createMessageMutation.isPending) {
      createMessageMutation.mutate()
    }
  }

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
      <Form onSubmit={(e) => handleSubmit(e)}>
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
                  disabled={!text || sending || createMessageMutation.isPending}
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
