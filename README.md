# Babble <img src="./babble/src/favicon.ico" alt="Logo" width="30" height="auto"> - Assignment 3

Babble is a real-time chatting website built using React, web sockets, and a custom API implementation as part of the second assignment in the Advanced Programming 2 course.

## About the Name 'Babble'

The name "Babble" reflects the concept of talking rapidly and continuously in a foolish, excited, or incomprehensible way. It also resonates with the playful nature of bubbles, which inspired the choice of logo for the website.

## API Functionality

The Babble website incorporates the following API endpoints and functionalities:

* **User**:
  - `GET /api/Users/{username}`: Retrieve user details by providing the username.
  - `POST /api/Users`: Create a new user.

* **Token**:
  - `POST /api/Tokens`: Generate a JSON Web Token (JWT) for registered users.

* **Chats**:
  - `GET /api/Chats`: Retrieve the list of chats for the user.
  - `POST /api/Chats`: Create a new chat.
  - `GET /api/Chats{id}`: Retrieve a specific chat associated with the user.
  - `DELETE /api/Chats{id}`: Delete a chat with a specific user.

* **Messages**:
  - `GET /api/Chats{id}/Messages`: Retrieve the list of messages in a specific chat.
  - `POST /api/Chats{id}/Messages`: Send a message in a specific chat.

Please refer to the API documentation for detailed information on each endpoint.

## Notes

* The Babble website currently does not have a backend server or database implementation. As a result, the messages sent through the application are not actually delivered to anyone. The focus of this assignment is on developing the user interface and functionality.

* User credentials (username and password) are stored in the browser's local storage. After the initial login or registration, the browser will save this data, allowing automatic login even after refreshing or reopening the browser. To log out, use the provided "Log out" button.

## Getting Started

To run the Babble website locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/arielverbin/Babble3.git
   ```

2. Navigate to the project directory:
   ```
   cd Babble3
   ```

3. Set up the server:
   - Go to the server directory:
     ```
     cd server
     ```
   - Install the required dependencies:
     ```
     npm install
     ```
   - Start the server:
     ```
     npm start
     ```

4. Set up the client:
   - Go to the client directory:
     ```
     cd ../babble
     ```
   - Install the required dependencies:
     ```
     npm install
     ```
   - Start the client:
     ```
     npm start
     ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the Babble website.

## Important Notes for Real-Time-Chatting!!!
in order to experience the real time chatting you need to open different browser/computers/a incognito window and a regular window



We hope you'll enjoy our web & real time chatting experience :)
Happy chatting!
