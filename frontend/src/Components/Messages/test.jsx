export const listChannels = async (queryParams) => {
  /*
  This function fetches the list of channels where the user is a member.
  It takes an object `queryParams` as input, which should contain the following properties:
  - `userId`: the ID of the user for whom the channels need to be fetched
  - `token`: the authentication token of the user

  The function constructs a URL with the provided query parameters and sends a GET request to the backend API. If the request is successful, it returns the fetched data. Otherwise, it throws an error.
  */
  // Code implementation...
}

// Create a new channel
export const createChannel = async (token, channel) => {
  /*
  This function creates a new channel in the backend.
  It takes two arguments:
  - `token`: the authentication token of the user creating the channel
  - `channel`: an object containing the details of the new channel, such as the title and the members

  The function sends a POST request to the backend API with the channel data. If the request is successful, it returns the created channel data. Otherwise, it throws an error.
  */
  // Code implementation...
}

export const checkChannelExists = async (userId1, userId2) => {
  /*
  This function checks if a channel already exists between two users.
  It takes two arguments:
  - `userId1`: the ID of the first user
  - `userId2`: the ID of the second user

  The function constructs a URL with the provided user IDs and sends a GET request to the backend API. If the request is successful, it returns a boolean value indicating whether the channel exists or not. Otherwise, it throws an error.
  */
  // Code implementation...
}

// Get a single channel by ID
export const getChannelById = async (channelId, token) => {
  /*
  This function fetches the details of a single channel by its ID.
  It takes two arguments:
  - `channelId`: the ID of the channel to be fetched
  - `token`: the authentication token of the user

  The function sends a GET request to the backend API with the channel ID. If the request is successful, it returns the fetched channel data. Otherwise, it throws an error.
  */
  // Code implementation...
}

// Get messages in a channel by ID
export const getChannelMessages = async (channelId, token) => {
  /*
  This function fetches the messages in a channel by its ID.
  It takes two arguments:
  - `channelId`: the ID of the channel for which the messages need to be fetched
  - `token`: the authentication token of the user

  The function sends a GET request to the backend API with the channel ID. If the request is successful, it returns the fetched messages. Otherwise, it throws an error.
  */
  // Code implementation...
}
// Get messages in a channel by ID
export const getMessagesByChannelId = async (channelId, token) => {
  /*
  This function fetches the messages in a channel by its ID.
  It takes two arguments:
  - `channelId`: the ID of the channel for which the messages need to be fetched
  - `token`: the authentication token of the user

  The function sends a GET request to the backend API with the channel ID. If the request is successful, it returns the fetched messages. Otherwise, it throws an error.
  */
  // Code implementation...
}
export const signup = async (formData) => {
  /*
  This function handles the user signup process.
  It takes a `formData` object as an argument, which should contain the user's signup information (e.g., username, password).

  The function sends a POST request to the backend API with the form data. If the request is successful, it returns the user's signup response. Otherwise, it throws an error.
  */
  // Code implementation...
}

export const getUserProfileImage = async (userId) => {
  /*
  This function fetches the profile image of a user by their ID.
  It takes a `userId` argument as the ID of the user whose profile image needs to be fetched.

  The function sends a GET request to the backend API to retrieve the user's profile image. If the request is successful, it returns the profile image data (as a Blob). Otherwise, it throws an error.
  */
  // Code implementation...
}

export const login = async ({ username, password }) => {
  /*
  This function handles the user login process.
  It takes an object with `username` and `password` properties as an argument.

  The function sends a POST request to the backend API with the login credentials. If the request is successful, it returns the user's login response. Otherwise, it throws an error.
  */
  // Code implementation...
}

export const getUserInfo = async (id) => {
  /*
  This function fetches the information of a user by their ID.
  It takes a `id` argument as the ID of the user whose information needs to be fetched.

  The function sends a GET request to the backend API to retrieve the user's information. If the request is successful, it returns the user's information. Otherwise, it throws an error.
  */
  // Code implementation...
}

export const getUsers = async (queryParams) => {
  /*
  This function fetches the list of all users.
  It takes an optional `queryParams` object as an argument, which can be used to filter the list of users.

  The function sends a GET request to the backend API with the provided query parameters. If the request is successful, it returns the list of users. Otherwise, it throws an error.
  */
  // Code implementation...
}
