import { useDispatch, useSelector } from "react-redux";
import { getUserFullname, getUserInitials } from "../../utils";
import toast from "react-hot-toast";
import {
  hideLoader,
  setAllChats,
  setSelectedChat,
  showLoader,
} from "../../redux";
import { createNewChat } from "../../apis";

export const UserList = ({ searchKey }) => {
  const {
    allUsers,
    allChats,
    selectedChat,
    user: currentUser,
  } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const startNewChat = async (searchedUser) => {
    const members = { members: [currentUser._id, searchedUser] };
    let res = null;
    try {
      dispatch(showLoader());
      res = await createNewChat(members);
      dispatch(hideLoader());

      if (res.success) {
        toast.success(res.message);

        const newChat = res.data;
        const updatedChat = [...allChats, newChat];

        dispatch(setAllChats(updatedChat));
        dispatch(setSelectedChat(newChat));
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error);
    }
  };

  const openChat = (selectedUser) => {
    const chat = allChats.find(
      (chat) =>
        chat.members.map((u) => u._id).includes(currentUser._id) &&
        chat.members.map((u) => u._id).includes(selectedUser),
    );

    if (chat) {
      dispatch(setSelectedChat(chat));
    }
  };

  const isSelectedChat = (user) => {
    if (selectedChat) {
      return selectedChat.members.map((u) => u._id).includes(user._id);
    }
    return false;
  };

  return allUsers
    ?.filter(
      (user) =>
        ((user.firstname.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchKey.toLowerCase())) &&
          searchKey) ||
        allChats?.some((chat) =>
          chat.members.map((u) => u._id).includes(user._id),
        ),
    )
    .map((user) => (
      <div
        className="user-search-filter"
        onClick={() => openChat(user._id)}
        key={user._id}
      >
        <div
          className={isSelectedChat(user) ? "selected-user" : "filtered-user"}
        >
          <div className="filter-user-display">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile Pic"
                className="user-profile-image"
              />
            ) : (
              <div
                className={
                  isSelectedChat(user)
                    ? "user-selected-avatar"
                    : "user-default-avatar"
                }
              >
                {getUserInitials(user)}
              </div>
            )}
            <div className="filter-user-details">
              <div className="user-display-name">{getUserFullname(user)}</div>
              <div className="user-display-email">{user.email}</div>
            </div>
            {!allChats?.find((chat) =>
              chat.members.map((u) => u._id).includes(user._id),
            ) && (
              <div className="user-start-chat">
                <button
                  type="button"
                  className="user-start-chat-btn"
                  onClick={() => startNewChat(user._id)}
                >
                  Start Chat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    ));
};
