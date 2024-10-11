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
