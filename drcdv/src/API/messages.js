// Get messages by channel ID
export const getMessagesByChannelId = async (channelId, token) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/channels/${channelId}/messages`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!res.ok) {
      throw new Error(`Error fetching messages: ${res.statusText}`)
    }
    const data = await res.json()
    console.log('Fetched channel messages:', data)
    return data
  } catch (error) {
    console.error('Error fetching channel messages:', error)
    throw error
  }
}

//get messages
export const getMessages = async (queryParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/messages?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}

// message new one
export const createMessage = async (token, message) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/messages`, {
    method: 'message',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(message),
  })
  return await res.json()
}
