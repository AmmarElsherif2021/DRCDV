//tanstack
import { useQuery } from '@tanstack/react-query'
//import './App.css'
import { MessageList } from '../Components/messages/MessageList.jsx'
import { CreateMessage } from '../Components/messages/CreateMessage.jsx'

//Api
import { getMessages } from '../API/messages.js'
//use state
import { useState } from 'react'

export function ChatSpace() {
  // Filters State
  const [sender] = useState('')

  // Edit Get messages based on channel id
  const messagesQuery = useQuery({
    queryKey: ['messages', { sender }],
    queryFn: () => getMessages({ sender }),
  })

  const messages = messagesQuery.data ?? []
  return (
    <div className='p-4 bg-yellow flex-1'>
      <MessageList messages={messages} />
      <hr className='my-4' />
      <CreateMessage />
    </div>
  )
}
