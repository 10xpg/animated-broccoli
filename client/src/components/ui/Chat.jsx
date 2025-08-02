import { useSelector } from "react-redux";
import { capitalize } from "../../utils";

export const ChatArea = () => {
  const { selectedChat, user } = useSelector((state) => state.userReducer);
  const selectedUser = selectedChat.members.find((u) => u._id !== user._id);

  return (
    <>
      {selectedChat && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">{`${capitalize(selectedUser.firstname)} ${capitalize(selectedUser.lastname)}`}</div>
          <div>CHAT AREA</div>
          <div>SEND MESSAGE</div>
        </div>
      )}
    </>
  );
};
