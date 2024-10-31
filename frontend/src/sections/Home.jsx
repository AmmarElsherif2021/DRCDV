import { ChatSpace } from './ChatSpace.jsx'
import { Header } from '../Components/Header/Header.jsx'
import { ChannelsBoard } from './ChannelsBoard.jsx'
import { Container, Row, Col, Button, Offcanvas } from 'react-bootstrap'
import { useUserHome } from '../contexts/UserHomeContext.jsx'
import { useChannel } from '../contexts/ChannelContext'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { Link } from 'react-router-dom'
import sidebar from '../assets/sidebar.svg'
import logo from '../assets/logo.svg'

export function Home() {
  const [token] = useAuth()
  const decodeToken = (token) => {
    if (!token || typeof token !== 'string') {
      console.error('Invalid token:', 'Token must be a valid string')
      return null
    }
    try {
      const decoded = jwtDecode(token)
      const userId = decoded.sub // Extracting 'sub' for user ID
      return { userId }
    } catch (error) {
      console.error('Invalid token:', error)
      return null
    }
  }

  const userData = decodeToken(token)
  const { isVisible, toggleVisibility } = useUserHome()
  const { selectedChannel } = useChannel()
  return (
    <>
      {!userData ? (
        <Container
          className='text-center mt-5'
          style={{
            position: 'fixed',
            top: 0,
            minWidth: '100vw',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            //backgroundColor: '#a12223',
          }}
        >
          <img src={logo} style={{ width: '9rem', marginBottom: '3rem' }} />
          <h1 style={{ marginBottom: '3rem' }}>
            Sign in and enjoy messaging experience using DRCDV
          </h1>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Link to={'/login'}>
              <Button
                variant='dark'
                className='m-2'
                style={{ backgroundColor: 'black', color: 'white' }}
              >
                Login
              </Button>
            </Link>
            <Link to={'/signup'}>
              <Button
                variant='light'
                className='m-2'
                style={{ backgroundColor: '#1CCB8F', color: 'black' }}
              >
                Signup
              </Button>
            </Link>
          </div>
        </Container>
      ) : (
        <Container
          fluid
          className='bg-light'
          style={{
            width: '100vw',
            height: '100vh',
            minWidth: '7rem', // minimum width for mobile
            paddingLeft: 0,
          }}
        >
          <Header toggleChannelsBoard={toggleVisibility} />
          {!isVisible && (
            <Button
              variant='outline'
              className='d-block d-md-none'
              onClick={toggleVisibility}
              style={{
                position: 'fixed',
                top: '1rem',
                left: '2rem',
                width: '4rem',
                height: '4rem',
                zIndex: 1000,
                border: 'none',
              }}
            >
              <img
                src={sidebar}
                alt='Toggle Sidebar'
                style={{
                  width: '3rem',
                  position: 'fixed',
                  top: '45%',
                  left: 0,
                }}
              />
            </Button>
          )}
          <Row className='g-0 mt-5' style={{ height: '90vh' }}>
            <Col xs={2} md={2} className='d-none d-md-block'>
              <ChannelsBoard />
            </Col>
            <Col
              xs={10}
              md={10}
              className='flex-grow-1'
              style={{
                paddingLeft: '5rem',
                margin: 0,
              }}
            >
              <ChatSpace channelId={selectedChannel} />
            </Col>
          </Row>
          <Offcanvas
            show={isVisible}
            onHide={toggleVisibility}
            placement='start'
            style={{
              width: '16.6667%',
              height: '100vh',
              padding: 0,
              backgroundColor: '#f8f9fa',
              minWidth: '7rem', // minimum width for mobile
            }}
          >
            <Offcanvas.Body className='p-0'>
              <ChannelsBoard />
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      )}
    </>
  )
}
