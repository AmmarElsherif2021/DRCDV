//tanstack
//import { useQuery } from '@tanstack/react-query'
//import './App.css'
//mport { MessageList } from '../Components/messages/MessageList.jsx'
import { CreateMessage } from '../Components/messages/CreateMessage.jsx'

// //Api
// import { getMessages } from '../API/messages.js'
// //use state
// import { useState } from 'react'

//tanstack
//import { useQuery } from '@tanstack/react-query'
//import './App.css'
//import { MessageList } from '../Components/messages/MessageList.jsx'
//import { CreateMessage } from '../Components/messages/CreateMessage.jsx'

//Api
//import { getMessages } from '../API/messages.js'
//use state
import { useState } from 'react'

import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap'

export function ChatSpace() {
  // const messagesQuery = useQuery({
  //   queryKey: ['messages', { sender }],
  //   queryFn: () => getMessages({ sender }),
  // })

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [user, setUser] = useState('User 1') // Toggle between User 1 and User 2

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user }])
      setInput('')
      setUser(user === 'User 1' ? 'User 2' : 'User 1') // Switch user
    }
  }

  return (
    <Container className='p-3'>
      <Row>
        <Col>
          <h2>Chat Space</h2>
          <ListGroup>
            {messages.map((message, index) => (
              <ListGroup.Item
                key={index}
                className={`d-flex justify-content-${message.user === 'User 1' ? 'start' : 'end'}`}
              >
                <div
                  className={`bg-${message.user === 'User 1' ? 'primary' : 'secondary'} text-white rounded p-2`}
                >
                  <strong>{message.user}: </strong>
                  {message.text}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Form className='mt-3' onSubmit={(e) => e.preventDefault()}>
            <Form.Group controlId='messageInput' className='d-flex'>
              <Form.Control
                type='text'
                placeholder='Type a message'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button variant='primary' className='ml-2' onClick={sendMessage}>
                Send
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <CreateMessage />
    </Container>
  )
}
