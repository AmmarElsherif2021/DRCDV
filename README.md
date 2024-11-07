# DRCDV Technical Documentation (UNDER DEVELOPMENT!)

https://drcdv.vercel.app/
use the following to log in:
**username**: guest
**password**: 1234

## **1. Introduction**

Welcome to the documentation for **DRCDV**, the **Dynamic and Responsive Chat Application with Data Visualization** project.

- **Purpose**:

DRVDV is a chat application developed using React, Socket.IO, Node.js/Express, and MongoDB. It aims to create a dynamic, interactive user interface that seamlessly integrates with server services. The application supports text messaging and dynamic visualization of various data types within the chat interface, such as tables, images, and text.

- **Scope**:

The documentation provided includes a system overview, usage guidelines, API details, code documentation, and deployment and testing procedures.

#### **2. System Overview**

- **Project Description**:

The application primarily offers a list of users and allows the initiation of chats with one or more individuals. Users can exchange text messages, images, data visualization files, and code snippets. However, all users must register their credentials to access the chat space and connect with others.

The main driving assumption is that **DRCDV is a sub-application within a larger-scaled business platform**, so all users recorded in the database are contactable.

## **3. Installation and Setup**

### **Prerequisites**

Before you start, ensure you have the following installed on your machine:

- **[Node.js](https://Node.js)** (version 18 or above)
- **npm** (version 8 or above)
- **MongoDB** (or use MongoDB Atlas for a cloud database)
- **Docker** (for containerization)
- **Git**

### **Clone the Repository**

1.  Open your terminal and clone the repository:

    sh

    ```
    git clone https://github.com/yourusername/DRCDV.git

    ```

2.  Navigate into the project directory:

    sh

    ```
    cd DRCDV

    ```

### **server Setup with Docker**

1.  Navigate to the server directory:

    sh

    ```
    cd server

    ```

2.  Create a `.env` file in the server directory and add your environment variables:

    sh

    ```
    touch .env

    ```

    Example `.env` file:

    ```
    DATABASE_URL="YOUR MONGO URI"
    JWT_SECRET="****"
    PORT=3001

    ```

3.  Build the Docker image:

    sh

    ```
    docker build -t drcdv-server .

    ```

4.  Run the Docker container:

    sh

    ```
    docker run -d -p 3001:3001 --name drcdv-server --env-file .env drcdv-server

    ```

### **Frontend Setup with Docker**

1.  Navigate to the frontend directory:

    sh

    ```
    cd frontend

    ```

2.  Create a `.env` file in the frontend directory and add your environment variables:

    sh

    ```
    touch .env

    ```

    Example `.env` file:

    ```
    VITE_server_URL="http://localhost:3001/api/v1"
    VITE_SOCKET_HOST="http://localhost:3001"

    ```

3.  Build the Docker image:

    sh

    ```
    docker build -t drcdv-frontend .

    ```

4.  Run the Docker container:

    sh

    ```
    docker run -d -p 80:80 --name drcdv-frontend --env-file .env drcdv-frontend

    ```

### **Deploying to Vercel and Render**

#### **server Deployment to Render**

1.  Login to your Render account.
2.  Create a new Web Service.
3.  Connect your GitHub repository and choose the `server` directory for deployment.
4.  Set the environment variables in the Render dashboard:

    - `DATABASE_URL`
    - `JWT_SECRET`
    - `PORT`

5.  Deploy your server service.

#### **Frontend Deployment to Vercel**

1.  Login to your Vercel account.
2.  Create a new Project.
3.  Connect your GitHub repository and choose the `frontend` directory for deployment.
4.  Set the environment variables in the Vercel dashboard:

    - `VITE_server_URL`
    - `VITE_SOCKET_HOST`

5.  Deploy your frontend application.

### **Running Locally**

To run the application locally for development and testing without Docker:

1.  **server**:

    sh

    ```
    cd server
    npm install
    npm start

    ```

2.  **Frontend**:

    sh

    ```
    cd frontend
    npm install
    npm start

    ```

### **Accessing the Application**

Once both the server and front end are deployed, you can access your application using the URL provided by Vercel for the front end and Render for the back end.

### **Common Issues and Troubleshooting**

- **Issue**: server service not connecting to MongoDB.

  - **Solution**: Check your MongoDB URI and ensure your database service is running.

- **Issue**: Frontend not connecting to server API.

  - **Solution**: Verify the API URL in the `.env` file and ensure the server service is accessible.

## **4. Usage Guidelines**

1. **Sign Up**  
   Users must sign up to access all features of the **DRCDV** subsystem.  
   ![S](/screens/s1.jpeg "Screen")
   ![S](/screens/s2.jpeg "Screen")
2. **Log In**  
   After registering with a unique username, email, and password, users can log in with their credentials and confirm adding all connections on the system.  
   ![S](/screens/s3.jpeg "Screen")

3. **Add Connections**  
   By clicking the **Add connections** button from the sidebar, a channel is automatically created between the user and every other user on the subsystem.  
   ![S](/screens/s4.jpeg "Screen")

4. **Open Single Connection**  
    Users can open any single connection channel from the connections list button on the sidebar to start messaging any individual user on DRCDV.  
   ![S](/screens/s5.jpeg "Screen")
   ![S](/screens/s6.jpeg "Screen")
   ![S](/screens/s7.jpeg "Screen")

5. **Create Multi-User Channel**  
   Users can create a channel and add multiple users, with the option to customize the role of the channel members as either **admin** or **guest**.  
   ![S](/screens/s13.jpeg "Screen")
   ![S](/screens/s14.jpeg "Screen")
   ![S](/screens/s15.jpeg "Screen")
   ![S](/screens/s16.jpeg "Screen")
   ![S](/screens/s17.jpeg "Screen")
   ![S](/screens/s18.jpeg "Screen")

6. **Access Channels**  
   From the channels list button on the sidebar, users can access the selected channel and start messaging.

7. **Create Instant Message**  
   Users can create an instant text message with the possibility to add downloadable attachments. Only images and CSV tables can be rendered in the message body.  
   ![S](/screens/s7.jpeg "Screen")
   ![S](/screens/s8.jpeg "Screen")
   ![S](/screens/s9.jpeg "Screen")

8. **Display Data Visualizations**  
   If the attachment is a CSV table, users have the option to display three different data visualization previews.  
   ![S](/screens/s10.jpeg "Screen")
   ![S](/screens/s11.jpeg "Screen")
   ![S](/screens/s12.jpeg "Screen")

## **5. API Details**

#### Channels API

### `listChannels`

**_Description_**:

This function fetches the list of channels where the user is a member.

**Parameters**:

- `queryParams` (object):

- `userId`: the ID of the user for whom the channels need to be fetched

- `token`: the authentication token of the user

**_Return_**:

The function constructs a URL with the provided query parameters and sends a GET request to the server API. If the request is successful, it *return*s the fetched data. Otherwise, it throws an error.

### `createChannel`

**_Description_**:

This function creates a new channel in the server.

**Parameters**:

- `token`: the authentication token of the user creating the channel

- `channel`: an object containing the details of the new channel, such as the title and the members

**_Return_**:

The function sends a POST request to the server API with the channel data. If the request is successful, it *return*s the created channel data. Otherwise, it throws an error.

### `checkChannelExists`

**_Description_**:

This function checks if a channel already exists between two users.

**Parameters**:

- `userId1`: the ID of the first user

- `userId2`: the ID of the second user

**_Return_**:

The function constructs a URL with the provided user IDs and sends a GET request to the server API. If the request is successful, it *return*s a boolean value indicating whether the channel exists or not. Otherwise, it throws an error.

### `getChannelById`

**_Description_**:

This function fetches the details of a single channel by its ID.

**Parameters**:

- `channelId`: the ID of the channel to be fetched

- `token`: the authentication token of the user

**_Return_**:

The function sends a GET request to the server API with the channel ID. If the request is successful, it *return*s the fetched channel data. Otherwise, it throws an error.

### `getChannelMessages`

**_Description_**:

This function fetches the messages in a channel by its ID.

**Parameters**:

- `channelId`: the ID of the channel for which the messages need to be fetched

- `token`: the authentication token of the user

**_Return_**:

The function sends a GET request to the server API with the channel ID. If the request is successful, it *return*s the fetched messages. Otherwise, it throws an error.

### `getMessagesByChannelId`

**_Description_**:

This function fetches the messages in a channel by its ID.

**Parameters**:

- `channelId`: the ID of the channel for which the messages need to be fetched

- `token`: the authentication token of the user

**_Return_**:

The function sends a GET request to the server API with the channel ID. If the request is successful, it *return*s the fetched messages. Otherwise, it throws an error.

#### Users API

### `signup`

**_Description_**:

This function handles the user signup process.

**Parameters**:

- `formData` (object): the user's signup information (e.g., username, password)

**_Return_**:

The function sends a POST request to the server API with the form data. If the request is successful, it *return*s the user's signup response. Otherwise, it throws an error.

### `getUserProfileImage`

**_Description_**:

This function fetches the profile image of a user by their ID.

**Parameters**:

- `userId`: the ID of the user whose profile image needs to be fetched

**_Return_**:

The function sends a GET request to the server API to retrieve the user's profile image. If the request is successful, it *return*s the profile image data (as a Blob). Otherwise, it throws an error.

### `login`

**_Description_**:

This function handles the user login process.

**_Parameters_**:

- `username` and `password` (object): the user's login credentials

**_Return_**:

The function sends a POST request to the server API with the login credentials. If the request is successful, it *return*s the user's login response. Otherwise, it throws an error.

### `getUserInfo`

**_Description_**:

This function fetches the information of a user by their ID.

**Parameters**:

- `id`: the ID of the user whose information needs to be fetched

**_Return_**:

The function sends a GET request to the server API to retrieve the user's information. If the request is successful, it *return*s the user's information. Otherwise, it throws an error.

### `getUsers`

**_Description_**:

This function fetches the list of all users.

**Parameters**:

- `queryParams` (object): optional query parameters to filter the list of users

**_Return_**:

The function sends a GET request to the server API with the provided query parameters. If the request is successful, it *return*s the list of users. Otherwise, it throws an error.

## **6. Code Documentation**
## A- Client side:
### Channels: creating, opening, and displaying flow:

1.  **_Channels Creating Flow_**:

- When a user signs up and logs in for the first time, the application automatically creates channels (direct message channels) between the new user and all other existing users.

- This is handled in the `UserHomeProvider` component, which uses the `useQuery` hook to fetch the list of channels for the current user's ID (`userId`).

- The `listChannels` API is called with the `userId` parameter to retrieve the user's channels.

- If the list of channels is not empty, the `isVisible` state is set to `true`, indicating that the channels should be displayed.

2.  **_Channels Opening Flow_**:

- The `ConnectionsList` component is responsible for displaying the list of direct message channels for the current user.

- It filters the `channels` array to only include direct message channels (where the `members.length` is less than 3).

- For each direct message channel, it renders a `ListGroup.Item` component, which displays the other user's profile image, name, and username.

- When a user clicks on a `ListGroup.Item`, the `handleChannelClick` function is called, which updates the `selectedChannel` in the `ChannelContext`.

3.  **_Channels Displaying Flow_**:

- The `ChannelsList` component is responsible for displaying the list of channels (both direct message and group channels) for the current user.

- It filters the `channels` array to only include channels where the number of members is greater than 2 (i.e., group channels).

- For each channel, it renders a `ChannelCard` component, which displays the channel's title and member count.

- When a user clicks on a `ChannelCard`, the `handleChannelClick` function is called, which updates the `selectedChannel` in the `ChannelContext`.

The `ChannelContext` is a central context that manages the state related to the currently selected channel, the channel messages, the channel members, and the avatar states for the members. It provides functions to set the selected channel, update the channel messages, set the channel members, fetch and manage user avatars, and manage the attachment cache.

The `UserHomeContext` is responsible for managing the visibility of the channels display based on whether the user has any channels. It provides a `toggleVisibility` function to show or hide the channels display.

Overall, the channels creating, opening, and displaying flow is designed to provide a seamless experience for users to access their direct message and group channels, with optimized avatar handling and attachment caching to improve performance and user experience.

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
socket.emit("createMessage", {
  userId,

  channelId,

  messageData: {
    text,

    attachments,

    tempId,
  },
});
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

│ ├── Avatar (for non-current users)

│ ├── SenderName

│ └── Attachments

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

### Message Listing Flow (MessageList.jsx):

#### Message Display:

Messages are sorted with pending messages at the end

Each message shows:

User avatar (with lazy loading)

Username (for non-current user messages)

Message text

Attachments (if any)

Different styling for current user vs other users' messages

#### Optimizations:

Uses React.memo for message components

Implements useMemo for expensive calculations

Pre-fetches member avatars

Automatically scrolls to newest messages

Handles loading states with a spinner

#### Key Features:

Optimistic updates (shows message immediately before server confirmation)

Real-time updates via Socket.IO

Responsive design with Bootstrap

Efficient avatar handling with caching

Support for file attachments

Visual feedback for pending messages

Smooth scrolling to new messages
## B- Server side:

  
  ## **Schemas**:
-  **Channel Schema**:
    
    -   The `channelSchema` looks good and covers the essential properties of a channel, including the title, members (with their roles), and messages.
    -   The use of `mongoose.Schema.Types.ObjectId` to reference the `User` and `Message` models is a common and appropriate approach for establishing relationships in a MongoDB database.
    -   Considering the potential for channels to have a large number of messages over time, it might be worth exploring pagination or other techniques to efficiently handle and retrieve message data.
    
    **Message Schema**:
    
    -   The `messageSchema` also looks well-designed, with the necessary properties like `sender`, `channel`, `text`, and `attachments`.
    -   The use of the `attachmentSchema` to store the filename, content type, and binary data (using `Buffer`) is a good way to manage file attachments.
    -   One potential improvement could be to consider storing the attachments in a separate file storage system (e.g., GridFS) instead of directly in the database, especially for larger files. This can help optimize database performance and scalability.
    
    **User Schema**:
    -   The `userSchema` covers the essential user information, including `username`, `email`, `password`, `status`, and `profileImage`.
    -   The unique constraints on `username` and `email` are a good practice to ensure data integrity.
    -   The `profileImage` field, which stores the image data directly in the database, might be better suited for storage in a file system or a service like GridFS, depending on the expected image sizes and usage patterns.
-   **Database Initialization**: **`init.js`**:
    -   The `initDatabase` function in `init.js` sets up the connection to the MongoDB database using the `DATABASE_URL` environment variable.
    -   This is a good approach, as it keeps the database connection details separate from the application code and allows for easier configuration and deployment.
    -   It's also a good practice to handle the database connection errors and reject the promise if the connection cannot be established.
  
  ## Services functions

1. **Channel-related Functions**:
   - `createChannel(userId, channelData)`: Creates a new channel with the provided data and adds the user as the initial admin member.
   - `listChannels(query, options)`: Retrieves a list of channels based on the provided query and sorting options.
   - `getChannelById(channelId)`: Fetches a channel by its unique identifier.
   - `addMemberToChannel(userId, channelId, newMember)`: Adds a new member to the specified channel.
   - `removeMembersFromChannel(userId, channelId, membersToRemove)`: Removes the specified members from the channel.
   - `deleteChannel(userId, channelId)`: Deletes the specified channel.
   - `checkChannelExists(userId1, userId2)`: Checks if a channel already exists between the two provided users.
   - `updateChannelMessages(channelId, message)`: Adds a new message to the specified channel.
   - `getChannelMessages(channelId, options)`: Retrieves the messages for the specified channel, with optional pagination and sorting.

2. **Message-related Functions**:
   - `createMessage(userId, channelId, { text, attachments })`: Creates a new message with the provided text and optional attachments.
   - `getMessageById(messageId)`: Retrieves a message by its unique identifier, with the sender's username populated.
   - `updateMessage(userId, messageId, { text })`: Updates the text content of a message.
   - `deleteMessage(userId, messageId)`: Deletes a message.
   - `listAllMessages(options)`: Retrieves a list of all messages, with optional sorting.
   - `listMessagesByTag(tags, options)`: Retrieves messages filtered by the provided tags, with optional sorting.
   - `listMessagesByAuthor(authorUsername, options)`: Retrieves messages authored by the specified user, with optional sorting.

3. **User-related Functions**:
   - `createUser({ username, email, password, profileImage })`: Creates a new user with the provided information.
   - `loginUser({ username, password })`: Authenticates a user and returns a JWT token.
   - `getUserInfoById(userId)`: Retrieves a user's basic information (username and email) by their unique identifier.
   - `getUsers()`: Retrieves a list of all users.

## Routes

### Channel Routes

This document outlines the channel-related routes added to the application.

### 1-  Create a New Channel
**Endpoint**: `POST /api/v1/channels`
**Description**: Creates a new channel.
**Authentication**: Requires authentication.
**Request Body**:
- `title` (string): The title of the channel.
- `description` (string, optional): The description of the channel.
- `members` (array, optional): An array of user IDs to add as members to the channel.
**Response**:
- `201 Created`: Returns the newly created channel object.
- `500 Internal Server Error`: If there's an error creating the channel.

### 2- Add a Member to a Channel
**Endpoint**: `POST /api/v1/channels/:cid/members`
**Description**: Adds a new member to the specified channel.
**Authentication**: Requires authentication.
**Path Parameters**:
- `cid` (string): The ID of the channel.
**Request Body**:
- `newMember` (string): The ID of the user to add as a new member.
**Response**:
- `200 OK`: Returns the updated channel object with the new member.
- `500 Internal Server Error`: If there's an error adding the member to the channel.

### 3-  Get Messages for a Channel
**Endpoint**: `GET /api/v1/channels/:cid/messages`
**Description**: Retrieves the messages for the specified channel.
**Authentication**: Requires authentication.
**Path Parameters**:
- `cid` (string): The ID of the channel.
**Query Parameters**:
- `limit` (number, optional): The maximum number of messages to retrieve (default: 300).
- `sortBy` (string, optional): The field to sort the messages by (default: `createdAt`).
- `sortOrder` (string, optional): The sort order, either `asc` or `desc` (default: `asc`).
**Response**:
- `200 OK`: Returns an array of message objects.
- `500 Internal Server Error`: If there's an error retrieving the messages.

### User Routes

This document outlines the user-related routes in the application.

### 1- Sign Up
**Endpoint**: `POST /api/v1/user/signup`
**Description**: Creates a new user account.
**Request Body**:
- `username` (string): The username for the new user.
- `email` (string): The email address for the new user.
- `password` (string): The password for the new user.
- `profileImage` (file, optional): The profile image for the new user.
**Response**:
- `201 Created`: Returns the username of the newly created user.
- `400 Bad Request`: If there's an error creating the user.

### 2- Login
**Endpoint**: `POST /api/v1/user/login`
**Description**: Authenticates a user and returns a JWT token.
**Request Body**:
- `username` (string): The username of the user.
- `password` (string): The password of the user.
**Response**:
- `200 OK`: Returns the JWT token.
- `400 Bad Request`: If the login fails.

### 3- Get User Information
**Endpoint**: `GET /api/v1/users/:id`
**Description**: Retrieves the basic information (username and email) of a user by their ID.
**Path Parameters**:
- `id` (string): The ID of the user.
**Response**:
- `200 OK`: Returns the user's basic information.
- `400 Bad Request`: If there's an error fetching the user information.

### 4- Get All Users
**Endpoint**: `GET /api/v1/users`
**Description**: Retrieves a list of all users.
**Response**:
- `200 OK`: Returns an array of user information objects.
- `400 Bad Request`: If there's an error fetching the users.

### Message Routes

This document outlines the message-related routes in the application.

### 1-  Get Messages by Channel
**Endpoint**: `GET /api/v1/channels/:cid/messages`
**Description**: Retrieves the messages for the specified channel.
**Authentication**: Requires authentication.
**Path Parameters**:
- `cid` (string): The ID of the channel.
**Query Parameters**:
- `limit` (number, optional): The maximum number of messages to retrieve (default: 300).
- `sortBy` (string, optional): The field to sort the messages by (default: `createdAt`).
- `sortOrder` (string, optional): The sort order, either `asc` or `desc` (default: `asc`).
**Response**:
- `200 OK`: Returns an array of message objects.
- `404 Not Found`: If the channel is not found.
- `500 Internal Server Error`: If there's an error retrieving the messages.

### 2- Get a Specific Message
**Endpoint**: `GET /api/v1/:cid/messages/:id`
**Description**: Retrieves a specific message by its ID.
**Path Parameters**:
- `cid` (string): The ID of the channel the message belongs to.
- `id` (string): The ID of the message.
**Response**:
- `200 OK`: Returns the message object.
- `404 Not Found`: If the message is not found.
- `500 Internal Server Error`: If there's an error retrieving the message.

## Create a Message
**Endpoint**: `POST /api/v1/:cid/messages`
**Description**: Creates a new message in the specified channel.
**Authentication**: Requires authentication.
**Path Parameters**:
- `cid` (string): The ID of the channel.
**Request Body**:
- `text` (string): The text content of the message.
- `attachments` (array, optional): An array of file attachments.
**Response**:
- `201 Created`: Returns the newly created message object.
- `500 Internal Server Error`: If there's an error creating the message.

### 3-  Update a Message
**Endpoint**: `PATCH /api/v1/:cid/messages/:id`
**Description**: Updates the text content of a specific message.
**Authentication**: Requires authentication.
**Path Parameters**:
- `cid` (string): The ID of the channel the message belongs to.
- `id` (string): The ID of the message.
**Request Body**:
- `text` (string): The new text content for the message.
**Response**:
- `200 OK`: Returns the updated message object.
- `404 Not Found`: If the message is not found.
- `500 Internal Server Error`: If there's an error updating the message.

## Delete a Message
**Endpoint**: `DELETE /api/v1/:cid/messages/:id`
**Description**: Deletes a specific message.
**Authentication**: Requires authentication.
**Path Parameters**:
- `cid` (string): The ID of the channel the message belongs to.
- `id` (string): The ID of the message.
**Response**:
- `204 No Content`: The message has been deleted successfully.
- `404 Not Found`: If the message is not found.
- `500 Internal Server Error`: If there's an error deleting the message.
## **7. Deployment**

## **8. Testing Procedures**

## **9. Troubleshooting**

## **10. Contributing**
