import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { User } from '../User/User'

export function Header() {
  const [token, setToken] = useAuth()

  return (
    <Navbar collapseOnSelect expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'></Nav>
          <Nav>
            {token ? (
              <>
                <Navbar.Text className='me-3'>
                  Logged in as <User id={jwtDecode(token).sub} />
                </Navbar.Text>
                <Nav.Link as={Link} to='/dashboard'>
                  Dashboard
                </Nav.Link>
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
