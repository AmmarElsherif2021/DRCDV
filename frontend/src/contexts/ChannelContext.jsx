import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react'
import { getUserProfileImage } from '../API/users'

const ChannelContext = createContext(null)

const initialState = {
  selectedChannel: null,
  channelMessages: [],
  channelMembers: [],
  avatarState: {},
  attachmentCache: new Map(),
  seenMembers: new Set(), // Track all members we've seen across channels
}

const AVATAR_STATUS = {
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
  IDLE: 'idle',
}

export const useChannel = () => {
  const context = useContext(ChannelContext)
  if (!context) {
    throw new Error('useChannel must be used within a ChannelProvider')
  }
  return context
}

export function ChannelProvider({ children }) {
  const [state, setState] = useState(initialState)
  const attachmentCacheRef = useRef(new Map())
  const avatarLoadingQueue = useRef(new Set())
  const seenMembersRef = useRef(new Set())

  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }))
  }, [])

  const avatarManager = {
    getAvatarState: useCallback(
      (userId) => {
        return state.avatarState[userId] || { status: AVATAR_STATUS.IDLE }
      },
      [state.avatarState],
    ),

    setAvatarState: useCallback(
      (userId, status, url = null) => {
        updateState({
          avatarState: {
            ...state.avatarState,
            [userId]: { status, url },
          },
        })
      },
      [updateState, state.avatarState],
    ),

    fetchOne: useCallback(
      async (userId) => {
        if (!userId) return null

        const currentState = avatarManager.getAvatarState(userId)

        // Clear existing avatar state when starting a new fetch
        if (currentState.status === AVATAR_STATUS.LOADED) {
          if (currentState.url?.startsWith('blob:')) {
            URL.revokeObjectURL(currentState.url)
          }
        }

        // Skip if already loading
        if (avatarLoadingQueue.current.has(userId)) {
          return null
        }

        // Set loading state and add to queue
        avatarLoadingQueue.current.add(userId)
        avatarManager.setAvatarState(userId, AVATAR_STATUS.LOADING)

        try {
          const blob = await getUserProfileImage(userId)

          // Check if the blob is empty or too small (likely a 1x1 pixel)
          if (!blob || blob.size < 100) {
            // Adjust size threshold as needed
            avatarManager.setAvatarState(userId, AVATAR_STATUS.FAILED)
            return null
          }

          const avatarUrl = URL.createObjectURL(blob)

          // Create a temporary image to verify the loaded image
          return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
              // Check if image has valid dimensions
              if (img.width <= 1 || img.height <= 1) {
                URL.revokeObjectURL(avatarUrl)
                avatarManager.setAvatarState(userId, AVATAR_STATUS.FAILED)
                resolve(null)
              } else {
                avatarManager.setAvatarState(
                  userId,
                  AVATAR_STATUS.LOADED,
                  avatarUrl,
                )
                resolve(avatarUrl)
              }
            }
            img.onerror = () => {
              URL.revokeObjectURL(avatarUrl)
              avatarManager.setAvatarState(userId, AVATAR_STATUS.FAILED)
              resolve(null)
            }
            img.src = avatarUrl
          })
        } catch (error) {
          console.error(`Failed to fetch avatar for user ${userId}:`, error)
          avatarManager.setAvatarState(userId, AVATAR_STATUS.FAILED)
          return null
        } finally {
          avatarLoadingQueue.current.delete(userId)
        }
      },
      [updateState],
    ),

    prefetchMany: useCallback(async (members) => {
      if (!members?.length) return

      const memberIds = members
        .map((member) => member.user || member._id)
        .filter((id) => {
          if (!id || seenMembersRef.current.has(id)) return false

          const state = avatarManager.getAvatarState(id)
          // Always refetch failed states when switching channels
          return (
            state.status === AVATAR_STATUS.IDLE ||
            state.status === AVATAR_STATUS.FAILED
          )
        })

      if (memberIds.length === 0) return

      // Clear seen members when processing new batch
      seenMembersRef.current.clear()
      memberIds.forEach((id) => seenMembersRef.current.add(id))

      // Process in smaller batches
      const batchSize = 2
      for (let i = 0; i < memberIds.length; i += batchSize) {
        const batch = memberIds.slice(i, i + batchSize)
        await Promise.all(batch.map(avatarManager.fetchOne))
        // Small delay between batches
        if (i + batchSize < memberIds.length) {
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
      }
    }, []),
  }

  // Channel member management with optimized avatar handling
  const setChannelMembers = useCallback(
    (members) => {
      if (!members?.length) return

      // Update channel members
      updateState({ channelMembers: members })

      // Start prefetching avatars
      avatarManager.prefetchMany(members)
    },
    [updateState],
  )

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(state.avatarState).forEach((avatarState) => {
        if (avatarState.url?.startsWith('blob:')) {
          URL.revokeObjectURL(avatarState.url)
        }
      })
      seenMembersRef.current.clear()
    }
  }, [])

  const value = {
    ...state,
    setSelectedChannel: useCallback(
      (channel) => updateState({ selectedChannel: channel }),
      [],
    ),
    setChannelMessages: useCallback((messages) => {
      setState((prev) => {
        if (JSON.stringify(prev.channelMessages) === JSON.stringify(messages)) {
          return prev
        }
        return { ...prev, channelMessages: messages }
      })
    }, []),
    setChannelMembers,
    getAvatarState: avatarManager.getAvatarState,
    fetchUserAvatar: avatarManager.fetchOne,
    prefetchMemberAvatars: avatarManager.prefetchMany,
    addAttachmentToCache: useCallback((attachmentId, data) => {
      attachmentCacheRef.current.set(attachmentId, data)
    }, []),
    getCachedAttachment: useCallback((attachmentId) => {
      return attachmentCacheRef.current.get(attachmentId)
    }, []),
    clearAttachmentCache: useCallback(() => {
      attachmentCacheRef.current.clear()
    }, []),
  }

  return (
    <ChannelContext.Provider value={value}>{children}</ChannelContext.Provider>
  )
}
