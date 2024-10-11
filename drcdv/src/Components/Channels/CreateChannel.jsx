import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { createChannel } from '../../API/channels'
import { useAuth } from '../../contexts/AuthContext'

export function CreateChannel() {
  const [formData, setFormData] = useState({
    title: '',
    members: [],
  })
  const [member, setMember] = useState({ user: '', role: 'guest' })
  const [token] = useAuth()
  const queryClient = useQueryClient()

  const createChannelMutation = useMutation({
    mutationFn: () => {
      const { title, members } = formData
      createChannel(token, { title, members })
    },
    onSuccess: () => queryClient.invalidateQueries(['channels']),
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMemberChange = (e) => {
    const { name, value } = e.target
    setMember((prev) => ({
      ...prev,
      [name]: value,
    }))
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
      setFormData({
        title: '',
        members: [],
      })
    }
  }, [createChannelMutation.isSuccess])

  //if (!token) return <div>Please log in to create new channel.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='title'
          id='create-title'
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
      <br />

      <label htmlFor='add-member'>Member: </label>
      <div>
        <h3>Members: </h3>
        <input
          type='text'
          name='user'
          value={member.user}
          onChange={handleMemberChange}
          placeholder='User'
        />
        <select
          name='role'
          value={member.role}
          onChange={handleMemberChange}
          style={{ marginRight: '10px' }}
        >
          <option value='admin'>Admin</option>
          <option value='guest'>guest</option>
        </select>

        {formData.members.map((member, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <span>•</span>
            {member.user} -- {member.role}
            <button type='button' onClick={() => handleRemoveMember(index)}>
              Remove
            </button>
          </div>
        ))}

        <button type='button' onClick={handleAddMember}>
          Add Member
        </button>
      </div>

      <br />
      <input
        type='submit'
        value={createChannelMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!formData.title || createChannelMutation.isPending}
      />
      {createChannelMutation.isSuccess && (
        <div>
          <br />
          channel created successfully!
        </div>
      )}
    </form>
  )
}
