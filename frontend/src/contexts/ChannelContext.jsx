import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { getUserProfileImage } from '../API/users'

const initialState = {
  selectedChannel: null,
  channelMessages: [],
  channelMembers: [],
  userAvatars: {},
  loadingAvatars: {},
  failedAvatars: {},
  attachmentCache: new Map(),
}

const ChannelContext = createContext(undefined)

export function useChannel() {
  const context = useContext(ChannelContext)
  if (context === undefined) {
    throw new Error('useChannel must be used within a ChannelProvider')
  }
  return context
}

export function ChannelProvider({ children }) {
  const [state, setState] = useState(initialState)
  const attachmentCacheRef = useRef(new Map())

  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }))
  }, [])

  const cacheManager = {
    addAttachment: useCallback((messageId, attachment) => {
      attachmentCacheRef.current.set(
        `${messageId}-${attachment.filename}`,
        attachment,
      )
      setState((prev) => ({ ...prev })) // Trigger minimal re-render
    }, []),

    getAttachment: useCallback((messageId, filename) => {
      return attachmentCacheRef.current.get(`${messageId}-${filename}`)
    }, []),
  }

  const avatarManager = {
    fetchOne: useCallback(
      async (userId) => {
        if (
          !userId ||
          state.userAvatars[userId] ||
          state.loadingAvatars[userId] ||
          state.failedAvatars[userId]
        ) {
          return state.userAvatars[userId] || null
        }

        updateState({
          loadingAvatars: { ...state.loadingAvatars, [userId]: true },
        })

        try {
          const avatarData = await getUserProfileImage(userId)
          if (avatarData) {
            updateState((prev) => ({
              userAvatars: { ...prev.userAvatars, [userId]: avatarData },
            }))
            return avatarData
          }
        } catch (error) {
          console.error(`Failed to fetch avatar for user ${userId}:`, error)
          updateState((prev) => ({
            failedAvatars: { ...prev.failedAvatars, [userId]: true },
          }))
        } finally {
          updateState((prev) => ({
            loadingAvatars: { ...prev.loadingAvatars, [userId]: false },
          }))
        }
        return null
      },
      [state.userAvatars, state.loadingAvatars, state.failedAvatars],
    ),

    prefetchMany: useCallback(
      async (members) => {
        if (!members?.length) return

        const memberIds = members
          .map((member) => member._id || member.user)
          .filter(
            (id) =>
              id &&
              !state.userAvatars[id] &&
              !state.loadingAvatars[id] &&
              !state.failedAvatars[id],
          )

        if (memberIds.length === 0) return

        const batchSize = 3
        for (let i = 0; i < memberIds.length; i += batchSize) {
          const batch = memberIds.slice(i, i + batchSize)
          await Promise.all(batch.map(avatarManager.fetchOne))
        }
      },
      [state.userAvatars, state.loadingAvatars, state.failedAvatars],
    ),
  }

  const value = {
    ...state,
    setSelectedChannel: useCallback(
      (channel) => updateState({ selectedChannel: channel }),
      [],
    ),
    setChannelMessages: useCallback((messages) => {
      setState((prev) => {
        // Only update if messages have actually changed
        if (JSON.stringify(prev.channelMessages) === JSON.stringify(messages)) {
          return prev
        }
        return { ...prev, channelMessages: messages }
      })
    }, []),
    setChannelMembers: useCallback(
      (members) => updateState({ channelMembers: members }),
      [],
    ),
    fetchUserAvatar: avatarManager.fetchOne,
    prefetchMemberAvatars: avatarManager.prefetchMany,
    addAttachmentToCache: cacheManager.addAttachment,
    getCachedAttachment: cacheManager.getAttachment,
  }

  return (
    <ChannelContext.Provider value={value}>{children}</ChannelContext.Provider>
  )
}
