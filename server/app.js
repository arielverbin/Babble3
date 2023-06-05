// importing express
const express = require('express');
const app = express();

const http = require("http");
const { Server } = require("socket.io");
// use body-parser to phrase the body of requests as json/URL-encoded.
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '4mb'}));

app.use(express.json());

// The cors middleware allows cross-origin requests,
// enabling the API to be accessed from different domains or ports.
const cors = require('cors');
app.use(cors());

//load environment variables from a configuration file.
const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');

//importing mongoose library to connect to a MongoDB database.
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Any files in the public directory can be accessed directly by the client.
app.use(express.static('public'))

// Route setup.
const users = require('./routes/user');
app.use('/api/Users', users);

const messages = require('./routes/Message');
app.use('/api/Chats', messages);

const chats = require('./routes/chat');
app.use('/api/Chats', chats);

const token = require('./routes/Token');
app.use('/api/Tokens', token);

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST" , "DELETE"],
    },
  });

io.on("connection", (socket) => {
    socket.on("send_message", () => {
        socket.broadcast.emit("receive_message");
    });
});
// // server start.
server.listen(process.env.PORT);

// io.on("connection", (socket) => {
//     console.log(`User connected: ${socket.id}`);
//   });
  
// server.listen(process.env.PORT, () => {
// console.log(`Server started on port ${process.env.PORT}`);
// });


