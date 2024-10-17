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
        position: 'relative',
        top: 0,
        left: 0,
        width: '100vw',
        height: '5rem',
        zIndex: 10000,
      }}
      className='bg-body-tertiary'
    >
      <Container>
        <Navbar.Brand href='#home'>
          <img src={logo} style={{ width: '4rem', margin: '1rem' }} />
          DRCDV
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'></Nav>
          <Nav>
            {token ? (
              <>
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
              </>
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
