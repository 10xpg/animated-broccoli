const express = require("express");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const messageRouter = require("./routes/message");
const { routeProtection } = require("./middlewares/auth.middleware");

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", routeProtection, userRouter);
app.use("/api/chat", routeProtection, chatRouter);
app.use("/api/message", routeProtection, messageRouter);

module.exports = app;
