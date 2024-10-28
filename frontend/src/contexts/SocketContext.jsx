/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext()

// Get the Socket.IO server URL from environment variables
const SOCKET_URL = import.meta.env.VITE_SOCKET_HOST || 'http://localhost:3001'

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socketIO = io(SOCKET_URL, {
      withCredentials: true, // Important for cross-origin requests
      transports: ['websocket'],
      path: '/socket.io', // Make sure this matches your server configuration
    })

    setSocket(socketIO)

    socketIO.on('connect', () => {
      console.log('Connected to Socket.IO server:', SOCKET_URL)
    })

    socketIO.on('connect_error', (err) => {
      console.error('Socket.IO connect error:', err)
    })

    return () => {
      socketIO.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export const useSocket = () => {
  return useContext(SocketContext)
}
