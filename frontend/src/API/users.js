export const signup = async (formData) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) throw new Error('failed to sign up')
  return await res.json()
}

// getUserProfileImage.js
export const getUserProfileImage = async (userId) => {
  try {
    const response = await fetch(
      `https://drcdv-1.onrender.com/api/v1/users/${userId}/profile-image`,
    )
    if (!response.ok) {
      throw new Error('failed to fetch profile image')
    }
    const avatarData = await response.blob()
    return avatarData
  } catch (error) {
    console.error(`Failed to fetch profile image for user ${userId}:`, error)
    throw error
  }
}

export const login = async ({ username, password }) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) throw new Error('failed to login')
  return await res.json()
}

export const getUserInfo = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await res.json()
}

//get all users
export const getUsers = async (queryParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/users?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}
