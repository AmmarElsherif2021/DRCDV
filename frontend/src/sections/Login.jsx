import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap'
import { login } from '../API/users'
import { useAuth } from '../contexts/AuthContext'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [, setToken] = useAuth()
  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      setToken(data.token)
      navigate('/')
    },
    onError: () => alert('Failed to log in!'),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Container className='p-2' style={{ width: '80vw', textAlign: 'center' }}>
        <Row className='justify-content-center'>
          <Col xs={12}></Col>
          <Col xs={12}>
            <h2 className='mb-4 text-center'>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                controlId='create-username'
                className='mb-3'
                style={{ maxWidth: '300px', margin: 'auto' }}
              >
                <Form.Control
                  type='text'
                  placeholder='Enter your username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId='create-password'
                className='mb-3'
                style={{ maxWidth: '300px', margin: 'auto' }}
              >
                <Form.Control
                  type='password'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                variant='dark'
                type='submit'
                disabled={!username || !password || loginMutation.isPending}
                className='w-60'
                style={{ backgroundColor: 'black', color: 'white' }}
              >
                {loginMutation.isPending ? 'Logging in...' : 'Log in'}
              </Button>
              {loginMutation.isError && (
                <Alert variant='danger' className='mt-3'>
                  Failed to log in!
                </Alert>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
      <Link to='/' className='btn btn-link mb-3'>
        Back to main page
      </Link>
    </div>
  )
}
