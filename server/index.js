const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require("cors");

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected: " + socket.id)

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
    console.log(data);
  })
})

server.listen(3001, () => {
  console.log("server is running");
});


/* 
since we can communicate with the clients and servers, here's everything we want to be able to have between them
user connected (done)
user wants to play, put them in a lobby
  so I give the client a join room button
  server sees that, takes their id, and puts them into the lobby (an array?)
when a 4th user wants to play, move those users to a game
  if lobby.count = 4, create room, move those people into a private socket room, clear lobby
when these users are in the game or lobby, they are only communicating with each other
  display every user with their id or username (could make the join thing a name form or something)
  create a thingy that takes in inputs, maybe also have it only if they're in a room
when a user does an input, the server can hanle that and display to others 
  basically like message with a specific message

reference: https://github.com/machadop1407/socket-io-react-example/blob/main/server/index.js
*/