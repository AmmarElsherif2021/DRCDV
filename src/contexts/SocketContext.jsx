import { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext()

// eslint-disable-next-line react/prop-types
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socketIO = io('http://localhost:3001')
    setSocket(socketIO)
    socketIO.on('connect', () => {
      console.log('Connected to Socket.IO server')
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
