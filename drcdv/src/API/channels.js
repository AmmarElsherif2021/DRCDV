// Get channels
export const listChannels = async (queryParams) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/channels?` +
        new URLSearchParams(queryParams),
    )
    if (!res.ok) {
      throw new Error(`Error fetching channels: ${res.statusText}`)
    }
    return await res.json()
  } catch (error) {
    console.error('Error listing channels:', error)
    throw error
  }
}

// Create new channel
export const createChannel = async (token, channel) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/channels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(channel),
    })
    if (!res.ok) {
      throw new Error(`Error creating channel: ${res.statusText}`)
    }
    return await res.json()
  } catch (error) {
    console.error('Error creating channel:', error)
    throw error
  }
}
