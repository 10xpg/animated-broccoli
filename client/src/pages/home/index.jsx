import { Header, Sidebar } from "../../components/layout";
import { ChatArea } from "../../components/ui";

export default function Home() {
  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <Sidebar />
        <ChatArea />
      </div>
    </div>
  );
}
