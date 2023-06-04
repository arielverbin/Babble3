# Babble <img src="./babble/src/favicon.ico" alt="Logo" width="30" height="auto"> - Assignment 3

This is a chatting website built using React, web sockets, as part of the second assignment in Advanced Programming 2 course.
We created a server based on a given API, now our website is dynamically.

#### About the name 'Babble' :)
Babble means 'talk rapidly and continuously in a foolish, excited, or incomprehensible way'. It also sounds like bubble, which is the reason behind our choice of logo.

Please note that the website does not have a backend server or database yet, so it does not actually send messages to anyone. It only contains the user interface and functionality (yet).

###### - i havent gone through that
## Our API
As a part of this assignment we have been asked to implement a given API with several functionalities:

* **User**:
GET         /api/Users/{username}   -    gives the user details by giving the username          

POST        /api/Users              -    creates new user

* **Token**:

POST        /api/Tokens             -     creates a JWT to a user that registered to the app

* **Chats**:
#GET         /api/Chats              -     get the chats' list of the user

#POST        /api/Chats              -     create a new chat

#GET         /api/Chats{id}          -     get a specific chat with our user

#DELETE      /api/Chats{id}          -     delete a chat with a specific user 

* **Messages**:

#GET         /api/Chats{id}/Messages -     get the messages list with a specific user

#POST        /api/Chats{id}/Messages -     send a message in a specific chat

## Notes

* Since we used *localStorage* to save the user's password and username, after the first log-in/register, the browser will save this data so even after refresh or reopening the browser, the user will automatically be logged in. Of course, log out can be possible using the *Log out* button.


## Getting Started

- NOTE:
* if you are on a Mac, package - json of server script should be: 
``"start": "export NODE_ENV=local && node app.js","test": "export NODE_ENV=test && node app.js"``
* otherwise:
``"start": "SET NODE_ENV=local && node app.js","test": "SET NODE_ENV=test && node app.js"``

To run the chatting website locally, follow these steps:

1. Clone the repository: ``git clone https://github.com/arielverbin/Babble3.git``

2. Navigate to the project directory: ``cd /path/to/repository``

server:
   1. ``cd server``
   2. ``npm i express cors body-parser mongoose custom-env socket.io``
   3. ``npm test``
client:
   1.  ``cd babble``
   2. Install *npm* using ``npm install``
   3. Start the client: ``npm start``


5. Open your browser and visit ``http://localhost:3000`` to view the website.
