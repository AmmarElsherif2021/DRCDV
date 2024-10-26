import { createContext, useContext, useState } from 'react'

const ChannelContext = createContext()

// eslint-disable-next-line react/prop-types
export const ChannelProvider = ({ children }) => {
  const [selectedChannel, setSelectedChannel] = useState(null)
  const [channelMessages, setChannelMessages] = useState([])
  const [channelMembers, setChannelMembers] = useState([])

  return (
    <ChannelContext.Provider
      value={{
        selectedChannel,
        setSelectedChannel,
        channelMessages,
        setChannelMessages,
        channelMembers,
        setChannelMembers,
      }}
    >
      {children}
    </ChannelContext.Provider>
  )
}

export const useChannel = () => useContext(ChannelContext)
