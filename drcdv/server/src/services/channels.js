import { Channel } from '../db/models/channel.js'

/*
- add users to channel
- remove users from channel
- Terminate channel
*  userId referes here to admin user, admin is the user who initiate messaging space with one or many users
 */

/*
name,    
members: [{user}],

*/
export async function createChannel(userId, { title }) {
  const channel = new Channel({
    title,
    members: [{ user: userId, role: 'admin' }],
  })
  return await channel.save()
}

//list Channels
export async function listChannels(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' },
) {
  return await Channel.find(query).sort({ [sortBy]: sortOrder })
}

// Get Channel by id
export async function getChannelById(channelId) {
  try {
    return await Channel.findById(channelId)
  } catch (error) {
    console.error('Error getting Channel by id:', error)
    throw error
  }
}

// Update Channel
export async function updateChannel(userId, channelId, { text }) {
  try {
    return await Channel.findOneAndUpdate(
      { _id: channelId, sender: userId },
      { $set: { text } },
      { new: true },
    )
  } catch (error) {
    console.error('Error updating Channel:', error)
    throw error
  }
}

// Delete Channel
export async function deleteChannel(userId, channelId) {
  try {
    return await Channel.deleteOne({ _id: channelId, sender: userId })
  } catch (error) {
    console.error('Error deleting Channel:', error)
    throw error
  }
}
