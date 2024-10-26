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
          style={{ width: '100vw', margin: '4vw' }}
        >
          <h1>Sign in and enjoy messaging experience using DRCDV</h1>
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
        </Container>
      ) : (
        <Container
          fluid
          className='bg-light min-vh-100'
          style={{ width: '100vw', paddingLeft: 0 }}
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
                left: '1rem',
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
                  top: '5rem',
                  left: 0,
                }}
              />
            </Button>
          )}
          <Row className='g-0 mt-5'>
            <Col xs={12} md={2} className='d-none d-md-block'>
              <ChannelsBoard />
            </Col>
            <Col
              xs={12}
              md={10}
              className='flex-grow-1'
              style={{
                paddingLeft: '4rem',

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
              width: '16.6667%', // Same width as Col md={2}
              height: '100vh',
              padding: 0,
              backgroundColor: '#f8f9fa',
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
