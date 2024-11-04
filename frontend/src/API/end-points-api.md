#### Channels API

### `listChannels`

**_Description_**:
This function fetches the list of channels where the user is a member.

**Parameters**:

- `queryParams` (object):
  - `userId`: the ID of the user for whom the channels need to be fetched
  - `token`: the authentication token of the user

**_Return_**:
The function constructs a URL with the provided query parameters and sends a GET request to the backend API. If the request is successful, it *return*s the fetched data. Otherwise, it throws an error.

### `createChannel`

**_Description_**:
This function creates a new channel in the backend.

**Parameters**:

- `token`: the authentication token of the user creating the channel
- `channel`: an object containing the details of the new channel, such as the title and the members

**_Return_**:
The function sends a POST request to the backend API with the channel data. If the request is successful, it *return*s the created channel data. Otherwise, it throws an error.

### `checkChannelExists`

**_Description_**:
This function checks if a channel already exists between two users.

**Parameters**:

- `userId1`: the ID of the first user
- `userId2`: the ID of the second user

**_Return_**:
The function constructs a URL with the provided user IDs and sends a GET request to the backend API. If the request is successful, it *return*s a boolean value indicating whether the channel exists or not. Otherwise, it throws an error.

### `getChannelById`

**_Description_**:
This function fetches the details of a single channel by its ID.

**Parameters**:

- `channelId`: the ID of the channel to be fetched
- `token`: the authentication token of the user

**_Return_**:
The function sends a GET request to the backend API with the channel ID. If the request is successful, it *return*s the fetched channel data. Otherwise, it throws an error.

### `getChannelMessages`

**_Description_**:
This function fetches the messages in a channel by its ID.

**Parameters**:

- `channelId`: the ID of the channel for which the messages need to be fetched
- `token`: the authentication token of the user

**_Return_**:
The function sends a GET request to the backend API with the channel ID. If the request is successful, it *return*s the fetched messages. Otherwise, it throws an error.

### `getMessagesByChannelId`

**_Description_**:
This function fetches the messages in a channel by its ID.

**Parameters**:

- `channelId`: the ID of the channel for which the messages need to be fetched
- `token`: the authentication token of the user

**_Return_**:
The function sends a GET request to the backend API with the channel ID. If the request is successful, it *return*s the fetched messages. Otherwise, it throws an error.

#### Users API

### `signup`

**_Description_**:
This function handles the user signup process.

**Parameters**:

- `formData` (object): the user's signup information (e.g., username, password)

**_Return_**:
The function sends a POST request to the backend API with the form data. If the request is successful, it *return*s the user's signup response. Otherwise, it throws an error.

### `getUserProfileImage`

**_Description_**:
This function fetches the profile image of a user by their ID.

**Parameters**:

- `userId`: the ID of the user whose profile image needs to be fetched

**_Return_**:
The function sends a GET request to the backend API to retrieve the user's profile image. If the request is successful, it *return*s the profile image data (as a Blob). Otherwise, it throws an error.

### `login`

**_Description_**:
This function handles the user login process.

**_Parameters_**:

- `username` and `password` (object): the user's login credentials

**_Return_**:
The function sends a POST request to the backend API with the login credentials. If the request is successful, it *return*s the user's login response. Otherwise, it throws an error.

### `getUserInfo`

**_Description_**:
This function fetches the information of a user by their ID.

**Parameters**:

- `id`: the ID of the user whose information needs to be fetched

**_Return_**:
The function sends a GET request to the backend API to retrieve the user's information. If the request is successful, it *return*s the user's information. Otherwise, it throws an error.

### `getUsers`

**_Description_**:
This function fetches the list of all users.

**Parameters**:

- `queryParams` (object): optional query parameters to filter the list of users

**_Return_**:
The function sends a GET request to the backend API with the provided query parameters. If the request is successful, it *return*s the list of users. Otherwise, it throws an error.
