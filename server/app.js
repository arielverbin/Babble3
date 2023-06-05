const userService = require('./services/user');
const messageService = require('./services/message');
const chatService = require('./services/chat');

// importing express
const express = require('express');
const app = express();

// importing http.
const http = require("http");
// use of socket.io
const {Server} = require("socket.io");
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

// initialize http server.
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:" + process.env.PORT,
        methods: ["GET", "POST", "DELETE", "PUT"],
    },
});

io.on("connection", async (socket) => {
    const currentUsername = socket.handshake.query.username;

    await userService.attachSocket(currentUsername, socket.id);

    socket.on("send_message", async (message) => {
        const receiverSocketID = await chatService.findReceiver(socket.handshake.query.username,
            message.chatID);


        if (receiverSocketID) { // receiver is connected
            await messageService.notifySendMessage(io, receiverSocketID, message);
        }
        //otherwise, don't need to notify anyone! When the receiver will be logged in,
        //they will fetch their messages anyway.
    });

    socket.on("add-chat", async (contactUsername) => {
        const receiverSocketID = (await userService.getSocketID(contactUsername));
        if (receiverSocketID) { // receiver is connected
            await chatService.notifyNewChat(io, receiverSocketID);
        }
    });

    socket.on("remove-chat", async (contactUsername) => {
        const receiverSocketID = (await userService.getSocketID(contactUsername));
        if (receiverSocketID) { // receiver is connected
            await chatService.notifyRemoveChat(io, receiverSocketID);
        }
    });

    socket.on("disconnect", async () => {
        // Client disconnected
        console.log("Client " + socket.handshake.query.username + " disconnected:", socket.id);
        await userService.disconnect(socket.handshake.query.username);
    });
});
// // server start.
server.listen(process.env.PORT);
