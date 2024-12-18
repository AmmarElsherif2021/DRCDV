import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { User } from '../User/User'
import { useAuth } from '../../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { ProfileImage } from '../User/ProfileImage'
import classNames from 'classnames'

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
    <div className='connections-list h-100 overflow-auto'>
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
              className={classNames('py-3 px-4', {
                'bg-hover': true,
                'border-bottom': true,
                'border-secondary-subtle': true,
              })}
              style={{
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
            >
              <div className='d-flex align-items-center'>
                <ProfileImage userId={otherUserId} size={48} showStatus />

                {/* User Info */}
                <div className='flex-grow-1 ms-3'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div className='text-truncate font-medium'>
                      <User id={otherUserId} showEmail={false} />
                    </div>
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
