import { useState, useEffect } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { createChannel } from '../../API/channels'
import { useAuth } from '../../contexts/AuthContext'
import {
  Form,
  Button,
  Card,
  ListGroup,
  Container,
  Dropdown,
  Row,
  Col,
} from 'react-bootstrap'
import { getUsers } from '../../API/users'
import { User } from '../User/User'
import { jwtDecode } from 'jwt-decode'

export function CreateChannel() {
  const [token] = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    members: [],
  })
  const [member, setMember] = useState({
    user: '',
    username: '',
    role: 'guest',
  })
  const queryClient = useQueryClient()

  // Get current user ID from token
  const currentUserId = token ? jwtDecode(token).sub : null

  const createChannelMutation = useMutation({
    mutationFn: () => {
      const { title, members } = formData
      return createChannel(token, {
        title,
        members: members.map(({ user, role }) => ({ user, role })),
      })
    },
    onSuccess: () => queryClient.invalidateQueries(['channels']),
  })

  const connectionsQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers({}),
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMemberChange = (userId) => {
    const selectedUser = (connectionsQuery.data ?? []).find(
      (user) => user._id === userId,
    )
    if (selectedUser) {
      setMember((prev) => ({
        ...prev,
        user: selectedUser._id,
        username: selectedUser.username,
      }))
    }
  }

  const handleAddMember = () => {
    if (member.user && member.role) {
      setFormData((prev) => ({
        ...prev,
        members: [...prev.members, { ...member, id: prev.members.length }],
      }))
      setMember({ user: '', username: '', role: 'guest' })
    }
  }

  const handleRemoveMember = (index) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    createChannelMutation.mutate()
  }

  useEffect(() => {
    if (createChannelMutation.isSuccess) {
      setFormData({ title: '', members: [] })
    }
  }, [createChannelMutation.isSuccess])

  const connections = connectionsQuery.data ?? []
  // Filter out current user and already selected members
  const availableConnections = Array.isArray(connections)
    ? connections.filter(
        (connection) =>
          connection._id !== currentUserId &&
          !formData.members.some((member) => member.user === connection._id),
      )
    : []

  return (
    <Container className='py-4'>
      <Row className='justify-content-center'>
        <Col md={8} style={{ width: '23rem' }}>
          <Form onSubmit={handleSubmit}>
            <Card className='shadow-sm'>
              <Card.Header className='bg-white'>
                <Card.Title className='mb-0'>Create New Channel</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Group className='mb-4'>
                  <Form.Label>Channel Title</Form.Label>
                  <Form.Control
                    type='text'
                    name='title'
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder='Enter channel title'
                  />
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Label>Add Members</Form.Label>
                  <div className='d-flex gap-2 mb-3'>
                    <Dropdown onSelect={handleMemberChange}>
                      <Dropdown.Toggle
                        variant='outline-secondary'
                        style={{ minWidth: '7rem' }}
                      >
                        {member.username || 'Select a user'}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {availableConnections.map((user) => (
                          <Dropdown.Item key={user._id} eventKey={user._id}>
                            {user.username}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Form.Select
                      value={member.role}
                      onChange={(e) =>
                        setMember((prev) => ({ ...prev, role: e.target.value }))
                      }
                      style={{ width: 'auto' }}
                    >
                      <option value='admin'>Admin</option>
                      <option value='guest'>Guest</option>
                    </Form.Select>
                  </div>
                  <div>
                    <Button
                      variant='primary'
                      onClick={handleAddMember}
                      disabled={!member.user}
                      style={{
                        backgroundColor: '#1CCB8F',
                        borderColor: '#1CCB8F',
                        minWidth: '7rem',
                      }}
                    >
                      Add Member
                    </Button>
                  </div>
                  <ListGroup className='mt-3'>
                    {formData.members.map((member, index) => (
                      <ListGroup.Item
                        key={index}
                        className='d-flex justify-content-between align-items-center'
                      >
                        <div className='d-flex align-items-center gap-2'>
                          <User id={member.user} />
                          <span className='text-muted'>({member.role})</span>
                        </div>
                        <Button
                          variant='outline-danger'
                          size='sm'
                          onClick={() => handleRemoveMember(index)}
                        >
                          Remove
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Form.Group>
                <div className='d-grid gap-2'>
                  <Button
                    type='submit'
                    disabled={
                      !formData.title || createChannelMutation.isPending
                    }
                    style={{
                      backgroundColor: '#1CCB8F',
                      borderColor: '#1CCB8F',
                    }}
                  >
                    {createChannelMutation.isPending
                      ? 'Creating...'
                      : 'Create Channel'}
                  </Button>
                </div>
                {createChannelMutation.isSuccess && (
                  <div className='text-success text-center mt-3'>
                    Channel created successfully!
                  </div>
                )}
              </Card.Body>
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateChannel
