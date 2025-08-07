const express = require("express");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const messageRouter = require("./routes/message");
const { routeProtection } = require("./middlewares/auth.middleware");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

const ws = require("http").createServer(app);
const io = require("socket.io")(ws, {
  cors: { origin: "http://localhost:5173" },
  method: ["GET", "POST"],
});

app.use("/api/auth", authRouter);
app.use("/api/user", routeProtection, userRouter);
app.use("/api/chat", routeProtection, chatRouter);
app.use("/api/message", routeProtection, messageRouter);

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("join-room", (userId) => {
    socket.join(userId);
    console.log(`User joined room: ${userId}`);
  });

  socket.once("send-msg", (msg) => {
    io.to(msg.members[0]).to(msg.members[1]).emit("receive-msg", msg);

    io.to(msg.members[0]).to(msg.members[1]).emit("set-msg-count", msg);
  });

  socket.on("clr-unread-msg", (chat) => {
    io.to(chat.members[0]).to(chat.members[1]).emit("msg-count-cleared", chat);
  });

  socket.on("user-typing", (chat) => {
    io.to(chat.members[0]).to(chat.members[1]).emit("started-typing", chat);
  });

  socket.on("user-login", (user) => {
    if (!onlineUsers.includes(user)) {
      onlineUsers.push(user);
    }

    socket.emit("online-users", onlineUsers);
  });

  socket.on("user-offline", (user) => {
    onlineUsers = onlineUsers.filter((u) => u._id !== user._id);
    io.emit("online-users-updated", onlineUsers);
  });
});

module.exports = ws;
