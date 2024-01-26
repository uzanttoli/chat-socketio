const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

const listUsers = [];

io.on("connection", function (socket) {
  console.log(listUsers);
  socket.on("newuser", function (username) {
    socket.broadcast.emit("update", username + " se conectou ao chat 🥰!");
    listUsers.push(username);
  });
  socket.on("exituser", function (username) {
    socket.broadcast.emit("update", username + " saiu do chat 😥...");
    listUsers.splice(username, 1);
  });
  socket.on("chat", function (message) {
    socket.broadcast.emit("chat", message);
  });
});

app.use(express.static(path.join(__dirname + "/public")));

server.listen(8081);
