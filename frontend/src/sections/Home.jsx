import { ChatSpace } from './ChatSpace.jsx'
import { Header } from '../Components/Header/Header.jsx'
import { Sidebar } from './Sidebar.jsx'
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
          className='text-center'
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            //backgroundColor: '#a12223',
          }}
        >
          <img src={logo} style={{ width: '20%', marginBottom: '3rem' }} />
          <h2 style={{ marginBottom: '3rem' }}>
            Sign in and enjoy messaging experience using DRCDV
          </h2>
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
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '100%',
            minHeight: '100%',
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
          <Row
            className='g-0 mt-5 h-100'
            style={{
              position: 'absolute',
              height: '100%',
              minHeight: '100%',
              width: '100%',
              //backgroundColor: '#4f4',
            }}
          >
            <Col xs={2} md={2} className='d-none d-md-block h-100 '>
              <Sidebar />
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
              width: '14.5%',
              height: '100%',
              padding: 0,
              backgroundColor: '#fffffa',
              minWidth: '6rem',
            }}
          >
            <Offcanvas.Body className='p-0 '>
              <Sidebar />
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      )}
    </>
  )
}
