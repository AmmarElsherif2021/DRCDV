//import './App.css'
import { ChatSpace } from './ChatSpace.jsx'
import { Header } from '../Components/Header/Header.jsx'
import { ChannelsBoard } from './ChannelsBoard.jsx'
import { useState } from 'react'
import { Container, Row, Col, Button, Offcanvas } from 'react-bootstrap'

export function Home() {
  const [isChannelsBoardVisible, setIsChannelsBoardVisible] = useState(false)

  const toggleChannelsBoard = () => {
    setIsChannelsBoardVisible(!isChannelsBoardVisible)
  }

  return (
    <Container fluid className='bg-light min-vh-100' style={{ width: '100vw' }}>
      <Header toggleChannelsBoard={toggleChannelsBoard} />
      <Button
        variant='outline-secondary'
        className='d-block d-md-none mb-3'
        onClick={toggleChannelsBoard}
      >
        {isChannelsBoardVisible ? 'Hide ChannelsBoard' : 'Show ChannelsBoard'}
      </Button>
      <Row className='d-flex flex-column flex-md-row'>
        <Col xs={12} md={4} className='mb-3 mb-md-0 d-none d-md-block'>
          <ChannelsBoard />
        </Col>
        <Col xs={12} md={8} className='flex-grow-1'>
          <ChatSpace />
        </Col>
      </Row>
      <Offcanvas
        show={isChannelsBoardVisible}
        onHide={toggleChannelsBoard}
        placement='start'
        style={{ width: '85%' }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ChannelsBoard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ChannelsBoard />
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  )
}
