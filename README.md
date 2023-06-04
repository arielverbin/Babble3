# Babble <img src="./babble/src/favicon.ico" alt="Logo" width="30" height="auto"> - Assignment 3

This is a chatting website built using React, web sockets, as part of the second assignment in Advanced Programming 2 course.
We created a server based on a given API, now our website is dynamically.

#### About the name 'Babble' :)
Babble means 'talk rapidly and continuously in a foolish, excited, or incomprehensible way'. It also sounds like bubble, which is the reason behind our choice of logo.

Please note that the website does not have a backend server or database yet, so it does not actually send messages to anyone. It only contains the user interface and functionality (yet).

###### - i havent gone through that
## Features

* **Add or Remove Contacts**: Users can  add new contacts by entering their username. They can also remove contacts if needed.
* **Send Messages**: Users can send messages to their contacts. Messages can be plain text or include a file attachment.
* **Change Profile Picture and Display Name**: Users have the option to change their profile picture and display name according to their preferences.
* **Search for Contacts**: Users can search for specific contacts using the search feature, making it convenient to find and connect with the desired recipient.
* **Multiple contacts**: Multiple users are able to register to the website.
######


## Notes

* Since we used *localStorage* to save the user's password and username, after the first log-in/register, the browser will save this data so even after refresh or reopening the browser, the user will automatically be logged in. Of course, log out can be possible using the *Log out* button.
* We included contacts and chats for example - register with the username 'guest' (choose a password), to view them.

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
