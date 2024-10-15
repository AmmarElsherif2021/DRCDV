import { createContext, useContext, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { listChannels } from '../API/channels'
import { useAuth } from '../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'

const UserHomeContext = createContext()

// eslint-disable-next-line react/prop-types
export const UserHomeProvider = ({ children }) => {
  const { authToken } = useAuth()
  const userId = authToken ? jwtDecode(authToken).sub : null
  const [isVisible, setIsVisible] = useState(false)

  const {
    data: channels,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['channels', userId],
    queryFn: () => listChannels({ userId }),
    enabled: !!userId,
  })

  useEffect(() => {
    if (!isLoading && !isError && channels) {
      setIsVisible(channels.length > 0)
    }
  }, [isLoading, isError, channels])

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading channels</div>
  }

  return (
    <UserHomeContext.Provider value={{ isVisible, toggleVisibility }}>
      {children}
    </UserHomeContext.Provider>
  )
}

export const useUserHome = () => useContext(UserHomeContext)
