//import './App.css'
import { ChatSpace } from './ChatSpace.jsx'
import { Header } from '../Components/Header/Header.jsx'
import { ChannelsBoard } from './ChannelsBoard.jsx'
import { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

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
        {isChannelsBoardVisible && (
          <Col xs={12} md={4} className='mb-3 mb-md-0'>
            <ChannelsBoard />
          </Col>
        )}
        <Col xs={12} md={isChannelsBoardVisible ? 8 : 12}>
          <ChatSpace />
        </Col>
      </Row>
    </Container>
  )
}
