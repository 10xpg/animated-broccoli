import { useSelector } from "react-redux";
import { Header, Sidebar } from "../../components/layout";
import { ChatArea } from "../../components/ui";
import { io } from "socket.io-client";
import { useEffect } from "react";

const SOCKET = io("http://localhost:3000");

export default function Home() {
  const { selectedChat, user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (user) {
      SOCKET.emit("join-room", user?._id);
    }
  }, [user]);

  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <Sidebar />
        {selectedChat && <ChatArea socket={SOCKET} />}{" "}
      </div>
    </div>
  );
}
