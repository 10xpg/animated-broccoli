import { useSelector } from "react-redux";
import { getUserFullname, getUserInitials } from "../../utils";

export const Header = () => {
  const { user } = useSelector((state) => state.userReducer);

  return (
    <div className="app-header">
      <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
        Quick Chat
      </div>
      <div className="app-user-profile">
        <div className="logged-user-name">{getUserFullname(user)}</div>
        <div className="logged-user-profile-pic">{getUserInitials(user)}</div>
      </div>
    </div>
  );
};
