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
export async function createChannel(userId, channelData) {
  try {
    const newChannel = new Channel({
      ...channelData,
      members: [...channelData.members, { user: userId, role: 'admin' }],
    })
    await newChannel.save()
    return newChannel
  } catch (error) {
    console.error('Error creating channel:', error)
    throw error
  }
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
//Add member
export async function addMemberToChannel(userId, channelId, newMember) {
  try {
    const channel = await Channel.findById(channelId)
    if (!channel) throw new Error('Channel not found')

    let userIsMember = channel.members.some(
      (member) => member.user.toString() === userId,
    )

    if (!userIsMember) {
      channel.members.push({ user: userId, role: 'admin' })
    } else {
      channel.members = channel.members.map((member) =>
        member.user.toString() === userId
          ? { ...member, role: 'admin' }
          : member,
      )
    }

    channel.members.push(newMember)
    await channel.save()
    return channel
  } catch (error) {
    console.error('Error adding member to channel:', error)
    throw error
  }
}

// Remove specified members from the channel
export async function removeMembersFromChannel(
  userId,
  channelId,
  membersToRemove,
) {
  try {
    const channel = await Channel.findById(channelId)
    if (!channel) throw new Error('Channel not found')

    // Remove specified members from the channel
    channel.members = channel.members.filter(
      (member) => !membersToRemove.includes(member.user.toString()),
    )

    await channel.save()
    return channel
  } catch (error) {
    console.error('Error removing members from channel:', error)
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

// Check if Channel Exists
export async function checkChannelExists(userId1, userId2) {
  try {
    const channel = await Channel.findOne({
      members: {
        $size: 2, // Ensure only two members in the channel
        $all: [
          { $elemMatch: { user: userId1 } },
          { $elemMatch: { user: userId2 } },
        ],
      },
    })
    return channel ? channel._id : null
  } catch (error) {
    console.error('Error checking channel:', error)
    throw error
  }
}
