// Get channels where the user is a member
export const listChannels = async (queryParams) => {
  try {
    const queryString = new URLSearchParams(queryParams).toString()
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/channels?${queryString}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${queryParams.token}`, // Ensure token is included
        },
      },
    )
    if (!res.ok) {
      throw new Error(`Error fetching channels: ${res.statusText}`)
    }
    const data = await res.json()
    console.log('Fetched channels:', data) // Logging the fetched data
    return data
  } catch (error) {
    console.error('Error listing channels:', error)
    throw error
  }
}

// Create a new channel
export const createChannel = async (token, channel) => {
  try {
    console.log('Sending to API:', channel) // Logging the entire channel object
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/channels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(channel),
    })
    const responseBody = await res.json() // Directly parse the response as JSON
    console.log(`API Creating channel body:`, responseBody) // Logging the JSON response directly
    if (!res.ok) {
      throw new Error(`Error creating channel: ${res.statusText}`)
    }
    return responseBody // Return the parsed JSON response
  } catch (error) {
    console.error('Error creating channel:', error)
    throw error
  }
}

export const checkChannelExists = async (userId1, userId2) => {
  try {
    const queryString = new URLSearchParams({ userId1, userId2 }).toString()
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/channels/check?${queryString}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    if (!res.ok) {
      throw new Error(`Error checking channel: ${res.statusText}`)
    }
    const data = await res.json()
    return data.exists // Assuming your backend returns { exists: true/false }
  } catch (error) {
    console.error('Error checking channel:', error)
    throw error
  }
}

// Get a single channel by ID
export const getChannelById = async (channelId, token) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/channels/${channelId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!res.ok) {
      throw new Error(`Error fetching channel: ${res.statusText}`)
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching channel:', error)
    throw error
  }
}

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
