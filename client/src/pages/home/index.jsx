import { Header, Sidebar } from "../../components/layout";

export default function Home() {
  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <Sidebar />
        {/* <!--CHAT AREA LAYOUT--> */}
      </div>
    </div>
  );
}
