import { Image } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import personIcon from '../../assets/person-icon.svg'
import { useChannel } from '../../contexts/ChannelContext'

export const Avatar = ({
  userId,
  size = 40,
  showStatus = false,
  style = {},
}) => {
  const { getAvatarState, fetchUserAvatar } = useChannel()
  const avatarState = getAvatarState(userId)
  const [hasValidImage, setHasValidImage] = useState(false)
  const previousUserIdRef = useRef(userId)

  useEffect(() => {
    // Reset state when userId changes
    if (previousUserIdRef.current !== userId) {
      setHasValidImage(false)
      previousUserIdRef.current = userId
    }

    if (!userId || avatarState.status !== 'idle') return

    const loadAvatar = async () => {
      try {
        await fetchUserAvatar(userId)
      } catch (err) {
        console.error('Failed to load avatar:', err)
      }
    }

    loadAvatar()
  }, [userId, avatarState.status, fetchUserAvatar])

  // Determine if we should show the placeholder
  const shouldShowPlaceholder =
    !userId ||
    !hasValidImage ||
    avatarState.status === 'failed' ||
    !avatarState.url ||
    (avatarState.status === 'loaded' && !avatarState.url)

  const isLoading = avatarState.status === 'loading'

  const handleImageLoad = (e) => {
    // Check if the loaded image has actual dimensions
    const hasSize = e.target.naturalWidth > 0 && e.target.naturalHeight > 0
    // Also check if the image isn't just a tiny 1x1 pixel
    const isNotEmpty = e.target.naturalWidth > 1 && e.target.naturalHeight > 1
    setHasValidImage(hasSize && isNotEmpty)
  }

  const handleImageError = () => {
    setHasValidImage(false)
  }

  return (
    <div
      className='position-relative'
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...style,
      }}
    >
      <Image
        src={shouldShowPlaceholder ? personIcon : avatarState.url}
        alt='User avatar'
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '50%',
          opacity: isLoading ? 0.5 : 1,
          transition: 'opacity 0.2s ease-in-out',
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      {showStatus && (
        <span
          className='position-absolute'
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: '#28a745',
            borderRadius: '50%',
            bottom: '0',
            right: '0',
            border: '2px solid white',
          }}
        />
      )}
      {isLoading && (
        <div
          className='position-absolute spinner'
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            border: '2px solid #f3f3f3',
            borderTop: '2px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      )}
    </div>
  )
}
