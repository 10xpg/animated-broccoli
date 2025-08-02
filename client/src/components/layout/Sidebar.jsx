import { useState } from "react";
import { Search, UserList } from "../ui";

export const Sidebar = () => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <div className="app-sidebar">
      <Search searchKey={searchKey} setSearchKey={setSearchKey} />
      <UserList searchKey={searchKey} />
    </div>
  );
};
