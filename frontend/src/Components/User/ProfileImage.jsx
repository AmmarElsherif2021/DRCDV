import { Image } from 'react-bootstrap'
import { useState } from 'react'
import personIcon from '../../assets/person-icon.svg'

export const ProfileImage = ({ userId, size = 40, showStatus = true }) => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div
      className='position-relative'
      style={{
        width: `${size}px`,
        height: `${size}px`,
        marginRight: '12px',
      }}
    >
      <Image
        src={
          imageError
            ? personIcon
            : `${import.meta.env.VITE_BACKEND_URL}/users/${userId}/profile-image`
        }
        alt='User avatar'
        onError={handleImageError}
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
