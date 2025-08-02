import { useSelector } from "react-redux";
import { Header, Sidebar } from "../../components/layout";
import { ChatArea } from "../../components/ui";

export default function Home() {
  const { selectedChat } = useSelector((state) => state.userReducer);

  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <Sidebar />
        {selectedChat && <ChatArea />}{" "}
      </div>
    </div>
  );
}
