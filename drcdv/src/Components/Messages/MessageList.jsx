import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Message } from './Message'
export function MessageList({ messages = [] }) {
  return (
    <div>
      {messages.map((message) => (
        <Fragment key={message._id}>
          <message {...message} />
        </Fragment>
      ))}
    </div>
  )
}
MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape(Message.propTypes)).isRequired,
}
