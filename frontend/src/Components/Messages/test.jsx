// useRealTimeMessages.jsx

// ChannelContext.jsx (Avatar handling updates)

// Message.jsx (Updated avatar handling)
const Message = React.memo(({ message, currentUserId }) => {
  return (
    <ListGroup.Item
      className={`d-flex ${isCurrentUser ? 'justify-content-end' : 'justify-content-start'} border-0 bg-transparent py-2`}
    >
      <div
        className={`d-flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} align-items-start gap-2`}
        style={{ maxWidth: '70%' }}
      >
        <div className='flex-shrink-0'>
          <Avatar
            userId={sender._id}
            size={40}
            showStatus={false}
            avatarData={avatarData}
            style={{
              border: message.pending ? '2px solid #e9ecef' : 'none',
            }}
          />
        </div>
        {/* Rest of the message component */}
      </div>
    </ListGroup.Item>
  )
})
