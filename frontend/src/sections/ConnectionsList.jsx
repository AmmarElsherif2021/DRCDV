/* eslint-disable react/prop-types */

import { ListGroup, Image, Badge } from 'react-bootstrap'
import { User } from '../Components/User/User'
import { useAuth } from '../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
import personIcon from '../assets/person-icon.svg'

export const ConnectionsList = ({ channels, handleChannelClick }) => {
  const [token] = useAuth()

  const decodeToken = (token) => {
    if (!token || typeof token !== 'string') return null
    try {
      const decoded = jwtDecode(token)
      return { userId: decoded.sub }
    } catch (error) {
      return null
    }
  }

  const userData = decodeToken(token)

  // Filter for direct message channels
  const directMessages = channels.filter(
    (channel) => channel.members.length < 3,
  )

  return (
    <div
      className='connections-list'
      style={{ height: '72vh', overflowY: 'auto' }}
    >
      <ListGroup variant='flush'>
        {directMessages.map((channel) => {
          const otherUserId = channel.title
            .split(',')
            .filter((x) => x !== userData?.userId)[0]

          return (
            <ListGroup.Item
              key={channel._id}
              action
              onClick={() => handleChannelClick(channel._id)}
              className='py-2'
              style={{
                cursor: 'pointer',
                borderLeft: 'none',
                borderRight: 'none',
                transition: 'background-color 0.2s ease',
              }}
            >
              <div className='d-flex align-items-center'>
                {/* User Avatar */}
                <div
                  className='position-relative'
                  style={{ width: '40px', height: '40px', marginRight: '12px' }}
                >
                  <Image
                    src={personIcon}
                    alt='User avatar'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%',
                    }}
                  />
                  {/* Online Status Indicator */}
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
                </div>

                {/* User Info */}
                <div className='flex-grow-1'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div className='text-truncate' style={{ maxWidth: '70%' }}>
                      <User id={otherUserId} />
                    </div>
                    {/* Example: Unread message indicator */}
                    {Math.random() > 0.7 && (
                      <Badge bg='primary' pill style={{ fontSize: '0.7rem' }}>
                        new
                      </Badge>
                    )}
                  </div>
                  <div
                    className='text-muted small text-truncate'
                    style={{ fontSize: '0.85rem' }}
                  >
                    Click to start chatting
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </div>
  )
}
