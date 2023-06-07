# Babble <img src="./babble/src/favicon.ico" alt="Logo" width="30" height="auto"> - Assignment 3

Babble is a real-time chatting website built using React, web sockets, and a custom API implementation as part of the third assignment in the Advanced Programming 2 course.

## About the Name 'Babble'

The name "Babble" reflects the concept of talking rapidly and continuously in a foolish, excited, or incomprehensible way. It also resonates with the playful nature of bubbles, which inspired the choice of logo for the website.

## API Functionality

The Babble website incorporates the following API endpoints and functionalities:

* **User**:
  - `GET /api/Users/:username`: Retrieve user details by providing the username.
  - `POST /api/Users`: Create a new user.
  - `PUT /api/Users/:username`: Change displayName or profilePicture for a specific user.

* **Token**:
  - `POST /api/Tokens`: Generate a JSON Web Token (JWT) for registered users.

* **Chats**:
  - `GET /api/Chats`: Retrieve the list of chats for the user.
  - `POST /api/Chats`: Create a new chat.
  - `GET /api/Chats:/id`: Retrieve a specific chat associated with the user.
  - `DELETE /api/Chats/:id`: Delete a chat with a specific user.

* **Messages**:
  - `GET /api/Chats/:id/Messages`: Retrieve the list of messages in a specific chat.
  - `POST /api/Chats/:id/Messages`: Send a message in a specific chat.
  - `GET /api/Chats/:id/Messages/FilesAttach`: Retrieve all file attachments from a specific chat.
  - `GET /api/Chats/Messages/FilesAttach/:msgId`: Retrieve the data of the file attached to a specific message.

Notice that we expanded the required API, but we ensured that the core functionalities remained intact. Users can now enjoy updating their profile picture or display name, and even sending messages with attached files.

## WebSockets
We used WebSocket technology in our application to provide real-time updates for sending messages, or creating/deleting chats. Whenever a user performs these actions, the changes will instantly appear on the other side, ensuring seamless and synchronized communication. However, for updates like changing the profile picture or display name, we made a conscious decision not to notify users immediately. These updates are not considered urgent and do not require immediate notification. Therefore, users can conveniently view the updated information after reopening the application or retrieving their contacts, which may occur periodically. This approach balances the need for timely updates with the consideration of user experience.

## Getting Started

To run the Babble website locally, follow these steps:

1. Clone the repository: `git clone https://github.com/arielverbin/Babble3.git`
   
2. Open a new terminal window, and navigate to the repository. Then, enter the *server* folder.
3. Make sure that you have installed all required dependencies: `npm i express cors body-parser mongoose custom-env socket.io`.
4. Run the server using `npm test`, (or `export NODE_ENV=test && node app.js` for macOS/Linux, `set NODE_ENV=test && node app.js` for Windows).
5. The server should be running.
6. Open your browser and visit [http://localhost:5001](http://localhost:5001) to access the Babble website.

## Notes about Real-Time chatting.
In this project, we have chosen to store the user's information in the localStorage of the browser. This decision was made to ensure that users do not get logged out when they refresh the page or reopen the browser. By utilizing localStorage, we provide a seamless experience where users can continue their session without interruption.

However, it is important to note that localStorage is shared across all tabs within the same browser. While this approach enables persistence, it poses a limitation for experiencing real-time chatting. To fully utilize the real-time chatting functionality, it is required to connect to multiple users using different browsers, or opening a single incognito tab alongside a single regular tab.

### We hope you'll enjoy our web & real time chatting experience :)
### Happy chatting! 😁
