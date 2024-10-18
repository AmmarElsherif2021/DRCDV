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
  const { selectedChannel, setSelectedChannel } = useChannel() // Use the context

  return (
    <>
      {!userData ? (
        <div>
          <h1>Sign in to enjoy messaging experience using DRCDV</h1>
          <Link to={'/login'}>login</Link>
          <Link to={'/signup'}>signup</Link>
        </div>
      ) : (
        <Container
          fluid
          className='bg-light min-vh-100'
          style={{ width: '100vw' }}
        >
          <Header toggleChannelsBoard={toggleVisibility} />

          <Col>
            {' '}
            {!isVisible && (
              <Button
                variant='outline'
                className='d-block d-md-none mb-3'
                onClick={toggleVisibility}
                style={{
                  position: 'absolute',
                  top: '10rem',
                  width: '4rem',
                  height: '4rem',
                  zIndex: 1000,
                  border: 'none',
                }}
              >
                <img
                  onClick={toggleVisibility}
                  src={sidebar}
                  style={{ width: '3rem' }}
                />
              </Button>
            )}
          </Col>

          <Row className='d-flex flex-column flex-md-row'>
            <Col xs={12} md={4} className='mb-3 mb-md-0 d-none d-md-block'>
              <ChannelsBoard
                onChannelClick={(channelId) => setSelectedChannel(channelId)}
              />
            </Col>
            <Col xs={12} md={8} className='flex-grow-1'>
              <ChatSpace channelId={selectedChannel} />
            </Col>
          </Row>
          <Offcanvas
            show={isVisible}
            onHide={toggleVisibility}
            placement='start'
            style={{ width: '55%' }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Channels Board</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ChannelsBoard
                onChannelClick={(channelId) => setSelectedChannel(channelId)}
              />
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      )}
    </>
  )
}
