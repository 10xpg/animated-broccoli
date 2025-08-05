import { useSelector } from "react-redux";
import { getUserFullname, getUserInitials } from "../../utils";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  return (
    <div className="app-header">
      <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
        Quick Chat
      </div>
      <div className="app-user-profile">
        <div className="logged-user-name">{getUserFullname(user)}</div>
        {user?.profileImg ? (
          <img
            onClick={() => navigate("/profile")}
            src={user?.profileImg}
            alt="pfp"
            className="logged-user-profile-pic"
          />
        ) : (
          <div
            className="logged-user-profile-pic"
            onClick={() => navigate("/profile")}
          >
            {getUserInitials(user)}
          </div>
        )}
      </div>
    </div>
  );
};
