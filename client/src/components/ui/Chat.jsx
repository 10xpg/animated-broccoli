import { useDispatch, useSelector } from "react-redux";
import { capitalize } from "../../utils";
import { hideLoader, showLoader } from "../../redux";
import { getMessagesForChat, message } from "../../apis";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export const ChatArea = () => {
  const { selectedChat, user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const selectedUser = selectedChat.members.find((u) => u._id !== user._id);

  const sendMessage = async () => {
    const msg = {
      chatId: selectedChat._id,
      text,
    };

    let res = null;

    try {
      dispatch(showLoader());
      res = await message(msg);
      dispatch(hideLoader());

      if (res.success) {
        toast.success(res.message);
        setText("");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error);
    }
  };

  const fetchAllMessages = async () => {
    let res = null;

    try {
      dispatch(showLoader());
      res = await getMessagesForChat(selectedChat._id);
      dispatch(hideLoader());

      if (res.success) {
        toast.success(res.message);
        setAllMessages(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error);
    }
  };

  useEffect(() => {
    try {
      fetchAllMessages();
    } catch (error) {
      console.error(error);
    }
  }, [selectedChat]);

  return (
    <>
      {selectedChat && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">{`${capitalize(selectedUser.firstname)} ${capitalize(selectedUser.lastname)}`}</div>
          <div className="main-chat-area">
            {allMessages.map((m) => {
              const isCurrentUserSender = m.sender === user._id;
              return (
                <div
                  className="message-container"
                  style={
                    isCurrentUserSender
                      ? { justifyContent: "end" }
                      : { justifyContent: "start" }
                  }
                  key={m._id}
                >
                  <div
                    className={
                      isCurrentUserSender ? "send-message" : "received-message"
                    }
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
              value={text}
              onChange={handleChange}
            />
            <button
              className="fa fa-paper-plane send-message-btn"
              aria-hidden="true"
              onClick={sendMessage}
            ></button>
          </div>
        </div>
      )}
    </>
  );
};
