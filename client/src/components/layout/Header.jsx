import { useSelector } from "react-redux";
import { getUserFullname, getUserInitials } from "../../utils";
import { useNavigate } from "react-router-dom";

export const Header = ({ socket }) => {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");

    socket.emit("user-offline", { user });
  };

  return (
    <div className="app-header">
      <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
        Quick Chat
      </div>
      <div className="app-user-profile">
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
        <div className="logged-user-name">{getUserFullname(user)}</div>
        <button type="button" className="logout-btn" onClick={logout}>
          <i className="fa fa-power-off"></i>
        </button>
      </div>
    </div>
  );
};
