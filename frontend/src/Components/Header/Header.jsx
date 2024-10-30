/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Navbar, Nav, Card, Button, Container } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import profileIcon from '../../assets/profile.svg'
import logo from '../../assets/logo.svg'
import { User } from '../../Components/User/User'
import { jwtDecode } from 'jwt-decode'

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
        left: isSmallScreen ? 0 : 'auto',
        right: isSmallScreen ? 'auto' : 0,
        zIndex: 1000,
        width: isSmallScreen ? '100vw' : '15rem',
      }}
    >
      <Card className='border-0'>
        <Card.Body className='d-flex flex-column align-items-center p-4'>
          <img
            src={profileIcon}
            alt='Profile'
            className='rounded-circle mb-3'
            style={{
              width: isSmallScreen ? '6rem' : '5rem',
              height: isSmallScreen ? '6rem' : '5rem',
            }}
          />
          <div className='mb-3'>
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
    <Navbar
      fixed='top'
      bg='light'
      expand='lg'
      className='shadow-sm'
      style={{ height: '4rem' }}
    >
      <Container fluid>
        <Navbar.Brand href='/'>
          <img src={logo} style={{ width: '3.5rem', marginRight: '0.5rem' }} />
          DRCDV
        </Navbar.Brand>
        <Nav className='justify-content-end'>
          {token ? (
            <div className='position-relative w-100'>
              <Button
                variant='link'
                onClick={toggleProfile}
                className='d-flex align-items-center text-decoration-none p-0'
              >
                <img
                  src={profileIcon}
                  alt='Profile'
                  className='rounded-circle'
                  style={{ width: '2.5rem', height: '2.5rem' }}
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
