/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Navbar, Nav, Card, Button, Container } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import logo from '../../assets/logo.svg'
import { User } from '../../Components/User/User'
import { jwtDecode } from 'jwt-decode'
import { ProfileImage } from '../User/ProfileImage'

export function Header() {
  const [token, setToken] = useAuth()
  const [showProfile, setShowProfile] = useState(false)

  const decodeToken = (token) => {
    if (!token || typeof token !== 'string') {
      return null
    }
    try {
      const decoded = jwtDecode(token)
      return { userId: decoded.sub }
    } catch (error) {
      console.error('Invalid token:', error)
      return null
    }
  }

  const userData = decodeToken(token)
  const handleLogout = () => {
    setToken(null)
    setShowProfile(false)
  }
  const toggleProfile = () => {
    setShowProfile(!showProfile)
  }

  const ProfileCard = ({ isSmallScreen }) => (
    <div
      className={`shadow-lg ${isSmallScreen ? 'd-block d-md-none' : 'd-none d-md-block'}`}
      style={{
        position: 'fixed',
        top: '4rem',
        right: '0rem',
        zIndex: 1000,
        width: isSmallScreen ? '100vw' : '15rem',
      }}
    >
      <Card className='border-0'>
        <Card.Body className='d-flex flex-column align-items-center p-4'>
          <div className='mb-3'>
            <ProfileImage
              userId={userData.userId}
              size={80}
              showStatus={false}
            />
          </div>
          <div className='mb-3 text-center'>
            {userData && <User id={userData.userId} showEmail={true} />}
          </div>
          <Button
            variant='outline-danger'
            size={isSmallScreen ? 'lg' : 'sm'}
            onClick={handleLogout}
            className='w-100'
          >
            Logout
          </Button>
        </Card.Body>
      </Card>
    </div>
  )

  return (
    <Navbar fixed='top' bg='light' expand='lg' className='shadow-sm'>
      <Container fluid className='px-4'>
        <Navbar.Brand href='/'>
          <img
            src={logo}
            style={{ width: '3.5rem', marginRight: '0.5rem' }}
            alt='DRCDV logo'
          />
          DRCDV
        </Navbar.Brand>
        <Nav className='ml-auto'>
          {token ? (
            <div className='position-relative'>
              <Button
                variant='link'
                onClick={toggleProfile}
                className='d-flex align-items-center text-decoration-none p-0'
              >
                <ProfileImage
                  userId={userData.userId}
                  size={50}
                  showStatus={false}
                />
              </Button>
              {showProfile && (
                <>
                  <ProfileCard isSmallScreen={true} />
                  <ProfileCard isSmallScreen={false} />
                </>
              )}
            </div>
          ) : (
            <Nav.Link href='/login'>Login</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}
