import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { User } from '../User/User'
import logo from '../../assets/logo.svg'
import { useChannel } from '../../contexts/ChannelContext'
import { useEffect } from 'react'
export function Header() {
  const [token, setToken] = useAuth()
  const { setSelectedChannel } = useChannel()
  useEffect(() => {
    if (!token) {
      setSelectedChannel({})
    }
  }, [token])
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      style={{
        position: 'fixed',
        width: '100vw',
        height: '5rem',
        zIndex: 20000,
      }}
      className='bg-body-tertiary'
    >
      <Container>
        <Navbar.Brand href='#home'>
          <img
            src={logo}
            style={{ width: '3.5rem', height: '3.5rem', margin: '1rem' }}
          />
          DRCDV
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse
          id='responsive-navbar'
          style={{
            zIndex: 10000,
          }}
        >
          <Nav className='me-auto'></Nav>
          <Nav style={{ backgroundColor: '#333220', color: '#fff' }}>
            {token ? (
              <div>
                <Navbar.Text className='me-3'>
                  Logged in as <User id={jwtDecode(token).sub} />
                </Navbar.Text>

                <Button
                  variant='outline-danger'
                  className='ms-3'
                  onClick={() => setToken(null)}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Nav.Link as={Link} to='/login'>
                  Log In
                </Nav.Link>
                <Nav.Link as={Link} to='/signup'>
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
