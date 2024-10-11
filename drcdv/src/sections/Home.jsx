//import './App.css'
import { ChatSpace } from './ChatSpace.jsx'
import { Header } from '../Components/Header/Header.jsx'
import { ChannelsBoard } from './ChannelsBoard.jsx'
import { useState } from 'react'

export function Home() {
  const [isChannelsBoardVisible, setIsChannelsBoardVisible] = useState(true)

  return (
    <div className='bg-yellow-500 min-h-screen'>
      <Header
        toggleChannelsBoard={() =>
          setIsChannelsBoardVisible(!isChannelsBoardVisible)
        }
      />
      <div className='flex flex-col md:flex-row'>
        {isChannelsBoardVisible && (
          <div className='w-full md:w-1/3'>
            <ChannelsBoard />
          </div>
        )}
        <div className='flex-1'>
          <ChatSpace />
        </div>
      </div>
    </div>
  )
}
