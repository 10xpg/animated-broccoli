import { useState } from "react";
import { Search } from "../ui";
import { UserList } from "./UserList.jsx";

export const Sidebar = () => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <div className="app-sidebar">
      <Search searchKey={searchKey} setSearchKey={setSearchKey} />
      <UserList searchKey={searchKey} />
    </div>
  );
};
