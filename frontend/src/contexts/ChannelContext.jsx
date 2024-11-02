import { createContext, useContext, useState, useCallback } from 'react'
import { getUserProfileImage } from '../API/users'

const ChannelContext = createContext()

export const ChannelProvider = ({ children }) => {
  const [selectedChannel, setSelectedChannel] = useState(null)
  const [channelMessages, setChannelMessages] = useState([])
  const [channelMembers, setChannelMembers] = useState([])
  const [userAvatars, setUserAvatars] = useState({})
  const [isLoadingAvatars, setIsLoadingAvatars] = useState(false)
  const [attachmentCache, setAttachmentCache] = useState({})

  // Cache attachments
  const addAttachmentToCache = useCallback((messageId, attachment) => {
    setAttachmentCache((prev) => ({
      ...prev,
      [messageId]: {
        ...(prev[messageId] || {}),
        [attachment.filename]: attachment,
      },
    }))
  }, [])

  const getCachedAttachment = useCallback(
    (messageId, filename) => {
      return attachmentCache[messageId]?.[filename]
    },
    [attachmentCache],
  )

  // Cache avatars
  const fetchUserAvatar = useCallback(
    async (userId) => {
      if (!userId) return null

      // Check if avatar is already cached
      if (userAvatars[userId]) {
        return userAvatars[userId]
      }

      // Check if avatar is being fetched
      if (isLoadingAvatars) {
        return null
      }

      try {
        setIsLoadingAvatars(true)
        const avatarData = await getUserProfileImage(userId)
        if (avatarData) {
          setUserAvatars((prev) => ({
            ...prev,
            [userId]: avatarData,
          }))
          return avatarData
        }
      } catch (error) {
        console.error(`Failed to fetch avatar for user ${userId}:`, error)
      } finally {
        setIsLoadingAvatars(false)
      }
      return null
    },
    [userAvatars, isLoadingAvatars],
  )

  const prefetchMemberAvatars = useCallback(
    async (members) => {
      if (!members?.length || isLoadingAvatars) return

      setIsLoadingAvatars(true)
      try {
        const memberIds = members
          .map((member) => member._id || member.user)
          .filter((id) => id && !userAvatars[id]) // Only fetch missing avatars

        if (memberIds.length === 0) {
          setIsLoadingAvatars(false)
          return
        }

        const avatarPromises = memberIds.map(async (userId) => {
          try {
            const avatarData = await getUserProfileImage(userId)
            return { userId, avatarData }
          } catch (error) {
            console.error(`Failed to fetch avatar for user ${userId}:`, error)
            return null
          }
        })

        const results = await Promise.all(avatarPromises)

        const newAvatars = results.reduce((acc, result) => {
          if (result?.avatarData) {
            acc[result.userId] = result.avatarData
          }
          return acc
        }, {})

        setUserAvatars((prev) => ({
          ...prev,
          ...newAvatars,
        }))

        console.log(
          'Successfully prefetched avatars:',
          Object.keys(newAvatars).length,
        )
      } catch (error) {
        console.error('Error in prefetchMemberAvatars:', error)
      } finally {
        setIsLoadingAvatars(false)
      }
    },
    [userAvatars, isLoadingAvatars],
  )

  return (
    <ChannelContext.Provider
      value={{
        selectedChannel,
        setSelectedChannel,
        channelMessages,
        setChannelMessages,
        channelMembers,
        setChannelMembers,
        userAvatars,
        fetchUserAvatar,
        prefetchMemberAvatars,
        isLoadingAvatars,
        addAttachmentToCache,
        getCachedAttachment,
      }}
    >
      {children}
    </ChannelContext.Provider>
  )
}

export const useChannel = () => useContext(ChannelContext)
