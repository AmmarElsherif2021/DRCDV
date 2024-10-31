import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap'
import { signup } from '../API/users'
import ImageUpload from './ImageUpload'

export function Signup() {
  const [username, setUsername] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const signupMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('email', email)
      formData.append('password', password)
      if (profileImage) {
        formData.append('profileImage', profileImage)
      }
      return await signup(formData)
    },
    onSuccess: (user) => {
      queryClient.invalidateQueries(['channels'])
      navigate('/login', { state: { token: user.token } })
    },
    onError: () => alert('Failed to sign up!'),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    signupMutation.mutate()
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container className='p-2' style={{ width: '60vw', textAlign: 'center' }}>
        <Row className='justify-content-center'>
          <Col xs={12}>
            <h2 className='mb-4 text-center'>Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <ImageUpload onImageSelect={setProfileImage} previewUrl={null} />
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
                controlId='create-email'
                className='mb-3'
                style={{ maxWidth: '300px', margin: 'auto' }}
              >
                <Form.Control
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                variant='light'
                type='submit'
                disabled={!username || !password || signupMutation.isLoading}
                className='w-40'
                style={{ backgroundColor: '#1CCB8F', color: 'black' }}
              >
                {signupMutation.isLoading ? 'Signing up...' : 'Sign Up'}
              </Button>
              {signupMutation.isError && (
                <Alert variant='danger' className='mt-3'>
                  Failed to sign up!
                </Alert>
              )}
            </Form>
          </Col>
        </Row>
        <Row xs={12}>
          <Link to='/' className='btn btn-link mb-3'>
            Back to main page
          </Link>
        </Row>
      </Container>
    </div>
  )
}
