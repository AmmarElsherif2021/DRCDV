### Message Creation & Sending Flow

### 1. Message Creation Process

The message creation process starts in the `CreateMessage` component and follows these steps:

#### Initial Setup

- Component uses `useMessageManagement` hook which manages:
  - Message text state
  - Attachments state
  - Sending state
  - User authentication
  - Socket connection

#### Message Submission Flow

1. User types message and/or adds attachments
2. On form submission:
   - Prevents default form behavior
   - Validates message (must have text and not already sending)
   - Creates message object with:
     - Text content
     - Any attachments
     - Channel ID
3. Optimistic Update:
   - Creates temporary message with `createTempMessage`
   - Adds to channel messages immediately
   - Shows with pending state (opacity: 0.7)

#### Socket Communication

1. Message sent to server via socket:

```javascript
socket.emit('createMessage', {
  userId,
  channelId,
  messageData: {
    text,
    attachments,
    tempId,
  },
})
```

2. Server processes message and emits 'messageCreated' event
3. Client receives confirmation and:
   - Removes temporary message
   - Adds confirmed message
   - Clears input fields
   - Resets sending state

### 2. Message Rendering Process

#### Message Component Structure

```
Message
├── MessageContent
│   ├── Avatar (for non-current users)
│   ├── SenderName
│   └── Attachments
```

#### Rendering Logic

1. Message Identification:

   - Determines if sender is current user
   - Resolves sender information from channel members

2. Styling Application:

   - Current user messages:
     - Right-aligned
     - Green background (#1CCB8F)
   - Other user messages:
     - Left-aligned
     - Black background
   - Pending messages:
     - Reduced opacity
     - Slightly scaled down

3. Avatar Handling:
   - Only shown for non-current users
   - Managed by ChannelContext
   - States: loading, loaded, failed, idle
   - Implements lazy loading and caching

### 3. Context Management

#### Channel Context

- Manages:
  - Selected channel
  - Channel messages
  - Channel members
  - Avatar states
  - Attachment cache

#### Socket Context

- Provides socket connection
- Handles:
  - Connection establishment
  - Error handling
  - Cross-origin requests
  - WebSocket transport

### 4. Optimization Strategies

#### Avatar Management

- Batch processing (2 avatars at a time)
- Caching mechanism
- Validates image quality
- Cleanup of blob URLs

#### Message Updates

- Optimistic updates for better UX
- Temporary message handling
- Efficient state updates
- Attachment caching

# Message Listing Flow (MessageList.jsx):

## Message Display:

Messages are sorted with pending messages at the end
Each message shows:

User avatar (with lazy loading)
Username (for non-current user messages)
Message text
Attachments (if any)

Different styling for current user vs other users' messages

## Optimizations:

Uses React.memo for message components
Implements useMemo for expensive calculations
Pre-fetches member avatars
Automatically scrolls to newest messages
Handles loading states with a spinner

## Key Features:

Optimistic updates (shows message immediately before server confirmation)
Real-time updates via Socket.IO
Responsive design with Bootstrap
Efficient avatar handling with caching
Support for file attachments
Visual feedback for pending messages
Smooth scrolling to new messages
