// Get messages by channel ID
app.get('/api/v1/channels/:cid/messages', requireAuth, async (req, res) => {
  const { cid } = req.params
  const { limit = 50, sortBy = 'createdAt', sortOrder = 'desc' } = req.query
  console.log(`Received request for messages in channel: ${cid}`)
  console.log(
    `Query params: limit=${limit}, sortBy=${sortBy}, sortOrder=${sortOrder}`,
  )
  console.log(`Auth token: ${req.headers.authorization?.substring(0, 20)}...`)

  try {
    // Check if the channel exists
    const channelExists = await Channel.exists({ _id: cid })
    if (!channelExists) {
      console.log(`Channel not found: ${cid}`)
      return res.status(404).json({ error: 'Channel not found' })
    }

    console.log(`Channel ${cid} exists, fetching messages`)
    const messages = await getMessagesByChannelId(cid, {
      limit: parseInt(limit),
      sortBy,
      sortOrder,
    })
    console.log(`Fetched ${messages.length} messages for channel ${cid}`)
    return res.json(messages)
  } catch (err) {
    console.error('Error listing messages:', err)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Invalid channel ID format' })
    }
    return res
      .status(500)
      .json({ error: 'Error listing messages', details: err.message })
  }
})
