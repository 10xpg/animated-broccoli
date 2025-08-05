import { useState } from "react";
import { Search, UserList } from "../ui";

export const Sidebar = ({ socket, onlineUser }) => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <div className="app-sidebar">
      <Search searchKey={searchKey} setSearchKey={setSearchKey} />
      <UserList searchKey={searchKey} socket={socket} onlineUser={onlineUser} />
    </div>
  );
};
