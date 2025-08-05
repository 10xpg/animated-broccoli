import { useSelector } from "react-redux";
import { Header, Sidebar } from "../../components/layout";
import { ChatArea } from "../../components/ui";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const SOCKET = io("http://localhost:3000");

export default function Home() {
  const { selectedChat, user } = useSelector((state) => state.userReducer);
  const [onlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    if (user) {
      SOCKET.emit("join-room", user?._id);
      SOCKET.emit("user-login", user?._id);
      SOCKET.on("online-users", (onlineUsers) => {
        setOnlineUser(onlineUsers);
      });
    }
  }, [user]);

  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <Sidebar socket={SOCKET} onlineUser={onlineUser} />
        {selectedChat && <ChatArea socket={SOCKET} />}
      </div>
    </div>
  );
}
