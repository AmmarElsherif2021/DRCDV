import { Image } from 'react-bootstrap'
import { useEffect, useState } from 'react'
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
  const [error, setError] = useState(false)

  useEffect(() => {
    let mounted = true

    const loadAvatar = async () => {
      if (!userId || avatarState.status !== 'idle') return

      try {
        await fetchUserAvatar(userId)
        if (mounted) setError(false)
      } catch (err) {
        if (mounted) setError(true)
        console.error('Failed to load avatar:', err)
      }
    }

    loadAvatar()

    return () => {
      mounted = false
    }
  }, [userId, avatarState.status, fetchUserAvatar])

  const shouldShowPlaceholder =
    !userId ||
    error ||
    avatarState.status === 'failed' ||
    avatarState.status === 'idle' ||
    !avatarState.url

  const isLoading = avatarState.status === 'loading'

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
        onError={() => setError(true)}
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
