const express = require("express");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const messageRouter = require("./routes/message");
const { routeProtection } = require("./middlewares/auth.middleware");

const app = express();
app.use(express.json());

const ws = require("http").createServer(app);
const io = require("socket.io")(ws, {
  cors: { origin: "http://localhost:5173" },
  method: ["GET", "POST"],
});

app.use("/api/auth", authRouter);
app.use("/api/user", routeProtection, userRouter);
app.use("/api/chat", routeProtection, chatRouter);
app.use("/api/message", routeProtection, messageRouter);

io.on("connection", (socket) => {
  socket.on("join-room", (userId) => {
    socket.join(userId);
    console.log(`User joined room: ${userId}`);
  });

  socket.on("send-msg", (msg) => {
    io.to(msg.members[0]).to(msg.members[1]).emit("receive-msg", msg);
  });
});

module.exports = ws;
