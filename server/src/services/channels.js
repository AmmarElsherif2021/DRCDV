import { Channel } from '../db/models/channel.js'

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

export async function listChannels(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' },
) {
  return await Channel.find(query).sort({ [sortBy]: sortOrder })
}

export async function getChannelById(channelId) {
  try {
    return await Channel.findById(channelId)
  } catch (error) {
    console.error('Error getting channel by id:', error)
    throw error
  }
}

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

export async function removeMembersFromChannel(
  userId,
  channelId,
  membersToRemove,
) {
  try {
    const channel = await Channel.findById(channelId)
    if (!channel) throw new Error('Channel not found')
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

export async function deleteChannel(userId, channelId) {
  try {
    return await Channel.deleteOne({ _id: channelId, sender: userId })
  } catch (error) {
    console.error('Error deleting channel:', error)
    throw error
  }
}

export async function checkChannelExists(userId1, userId2) {
  try {
    const channel = await Channel.findOne({
      members: {
        $size: 2,
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

export async function updateChannelMessages(channelId, message) {
  try {
    const channel = await Channel.findById(channelId)
    if (!channel) throw new Error('Channel not found')
    channel.messages.push(message)
    await channel.save()
    return channel
  } catch (error) {
    console.error('Error updating channel messages:', error)
    throw error
  }
}

// retrieve message texts from the channel
export async function getChannelMessages(channelId) {
  try {
    const channel = await Channel.findById(channelId).populate({
      path: 'messages',
      populate: { path: 'sender', model: 'User', select: 'username' },
    })
    if (!channel) throw new Error('Channel not found')
    return channel.messages.map((message) => ({
      text: message.text,
      sender: message.sender.username,
      createdAt: message.createdAt,
    }))
  } catch (error) {
    console.error('Error retrieving channel messages:', error)
    throw error
  }
}
