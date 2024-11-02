import { Image } from 'react-bootstrap'
import { useState } from 'react'
import personIcon from '../../assets/person-icon.svg'
import { useChannel } from '../../contexts/ChannelContext'
export const Avatar = ({
  userId,
  size = 40,
  showStatus = false,
  style = {},
}) => {
  const { userAvatars } = useChannel()
  const [hasError, setHasError] = useState(false)
  const avatarUrl = userAvatars[userId]

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
        src={!hasError && avatarUrl ? avatarUrl : personIcon}
        alt='User avatar'
        onError={(e) => {
          setHasError(true)
          e.target.src = personIcon
          console.log(`Failed to load avatar for user ${userId}`)
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '50%',
        }}
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
    </div>
  )
}
