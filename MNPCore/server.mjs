import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Store connected users
const users = new Map();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle client ready event
  socket.on("client_ready", (data) => {
    console.log(`Client ready: ${data.userName}`);
    // Add user to our map
    users.set(socket.id, data.userName);

    // Broadcast updated online users to all clients
    const onlineUsers = Array.from(users.values());
    io.emit("online_users", onlineUsers);
  });

  // Handle chat messages
  socket.on("message", (data) => {
    // Broadcast to all clients except sender
    socket.broadcast.emit("message", {
      msg: data.msg,
      user: users.get(socket.id) || "Unknown",
    });
  });

  // Handle typing indicator
  socket.on("typing", (username) => {
    socket.broadcast.emit("typing", username);
  });

  socket.on("stop_typing", () => {
    socket.broadcast.emit("stop_typing");
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    // Remove user from our map
    users.delete(socket.id);

    // Broadcast updated online users
    const onlineUsers = Array.from(users.values());
    io.emit("online_users", onlineUsers);
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
