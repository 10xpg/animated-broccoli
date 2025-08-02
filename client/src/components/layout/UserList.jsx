import { useSelector } from "react-redux";
import { getUserFullname, getUserInitials } from "../../utils";

export const UserList = ({ searchKey }) => {
  const { allUsers } = useSelector((state) => state.userReducer);

  return allUsers
    ?.filter(
      (user) =>
        (user.firstname.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchKey.toLowerCase())) &&
        searchKey,
    )
    .map((user) => (
      <div class="user-search-filter">
        <div class="filtered-user">
          <div class="filter-user-display">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile Pic"
                class="user-profile-image"
              />
            ) : (
              <div class="user-default-profile-pic">
                {getUserInitials(user)}
              </div>
            )}
            <div class="filter-user-details">
              <div class="user-display-name">{getUserFullname(user)}</div>
              <div class="user-display-email">{user.email}</div>
            </div>
            <div class="user-start-chat">
              <button class="user-start-chat-btn">Start Chat</button>
            </div>
          </div>
        </div>
      </div>
    ));
};
