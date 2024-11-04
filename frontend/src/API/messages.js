// Get messages in a channel by ID
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
      throw new Error(`Error fetching channel messages: ${res.statusText}`)
    }
    const data = await res.json()
    console.log('Fetched channel messages:', data) // Logging the fetched messages
    return data
  } catch (error) {
    console.error('Error fetching channel messages:', error)
    throw error
  }
}
