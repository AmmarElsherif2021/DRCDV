import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createChannel } from '../../API/channels'
import { useAuth } from '../../contexts/AuthContext'
import {
  Form,
  Button,
  InputGroup,
  Card,
  ListGroup,
  Container,
} from 'react-bootstrap'

export function CreateChannel() {
  const [formData, setFormData] = useState({ title: '', members: [] })
  const [member, setMember] = useState({ user: '', role: 'guest' })
  const [token] = useAuth()
  const queryClient = useQueryClient()

  const createChannelMutation = useMutation({
    mutationFn: () => {
      const { title, members } = formData
      return createChannel(token, { title, members })
    },
    onSuccess: () => queryClient.invalidateQueries(['channels']),
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMemberChange = (e) => {
    const { name, value } = e.target
    setMember((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddMember = () => {
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, { ...member, id: prev.members.length }],
    }))
    setMember({ user: '', role: 'guest' })
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

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Card className='mb-4'>
          <Card.Body>
            <Form.Group>
              <Form.Label htmlFor='create-title'>Title:</Form.Label>
              <Form.Control
                type='text'
                name='title'
                id='create-title'
                value={formData.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className='mt-3'>
              <Form.Label htmlFor='add-member'>Member:</Form.Label>
              <InputGroup>
                <Form.Control
                  type='text'
                  name='user'
                  value={member.user}
                  onChange={handleMemberChange}
                  placeholder='User'
                />
                <Form.Select
                  name='role'
                  value={member.role}
                  onChange={handleMemberChange}
                >
                  <option value='admin'>Admin</option>
                  <option value='guest'>Guest</option>
                </Form.Select>
                <Button variant='outline-secondary' onClick={handleAddMember}>
                  Add Member
                </Button>
              </InputGroup>
              <ListGroup className='mt-3'>
                {formData.members.map((member, index) => (
                  <ListGroup.Item
                    key={index}
                    className='d-flex justify-content-between align-items-center'
                  >
                    {member.user} -- {member.role}
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
            <Button
              type='submit'
              variant='primary'
              disabled={!formData.title || createChannelMutation.isPending}
              className='mt-3'
            >
              {createChannelMutation.isPending ? 'Creating...' : 'Create'}
            </Button>
            {createChannelMutation.isSuccess && (
              <div className='mt-3 text-success'>
                Channel created successfully!
              </div>
            )}
          </Card.Body>
        </Card>
      </Form>
    </Container>
  )
}
