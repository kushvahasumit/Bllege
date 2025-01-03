import express from 'express';
import { configDotenv } from 'dotenv';
import { connectDB } from './db/connectDB.js';
import http from "http"; //using http module bcz we cant directly listen
import { Server } from "socket.io";
import authRouters from "./routes/authRoute.js";
import postRouters from "./routes/postRoute.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

configDotenv();
const app = express();
const server = http.createServer(app); 
const CLIENT_ORIGIN = process.env.RESET_URL || "http://localhost:5173";
const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const attachSocketIO = (req, res, next) => {
  req.io = io;
  next();
};

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouters);
app.use("/api/post",attachSocketIO, postRouters);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", (collegeName) => {
    socket.join(collegeName);
    console.log(`User joined room: ${collegeName}`);
  });

  socket.on("chatMessage", ({ collegeName, message }) => {
    io.to(collegeName).emit("chatMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    socket.to(room).emit("userLeft", { userId: socket.id });
  });
});

server.listen(PORT, () => { //server.listen both http and websocket request
    connectDB();
    console.log("server is runing on port -->",PORT);
})

