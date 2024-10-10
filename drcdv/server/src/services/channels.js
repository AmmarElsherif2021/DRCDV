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
messages: [{ message}],
*/
export async function createChannel(userId, { name }) {
  const channel = new Channel({
    name,
    messages: [],
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

//Get Channel by id:
export async function getChannelById(id) {
  return Channel.findById(id)
}

//Get Channel by author
