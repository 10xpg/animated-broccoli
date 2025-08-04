import { useDispatch, useSelector } from "react-redux";
import { capitalize, formatTimestamp } from "../../utils";
import { hideLoader, showLoader } from "../../redux";
import { clearUnreadMsgCount, getMessagesForChat, message } from "../../apis";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export const ChatArea = ({ socket }) => {
  const { selectedChat, user, allChats } = useSelector(
    (state) => state.userReducer,
  );
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
        // toast.success(res.message);
        setAllMessages(res.data);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error);
    }
  };

  const resetUnreadMessages = async () => {
    let res = null;
    const payload = { chatId: selectedChat._id };
    try {
      dispatch(showLoader());
      res = await clearUnreadMsgCount(payload);
      dispatch(hideLoader());

      if (res.success) {
        allChats.map((chat) => {
          if (chat._id === selectedChat._id) {
            return res.data;
          }
          return chat;
        });
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error);
    }
  };

  useEffect(() => {
    try {
      fetchAllMessages();
      if (selectedChat.lastMessage.sender !== user._id) resetUnreadMessages();
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
                  <div>
                    <div
                      className={
                        isCurrentUserSender
                          ? "send-message"
                          : "received-message"
                      }
                    >
                      {m.text}
                    </div>
                    <div
                      className="message-timestamp"
                      style={
                        isCurrentUserSender
                          ? { float: "right" }
                          : { float: "left" }
                      }
                    >
                      {formatTimestamp(m.createdAt)}
                      {isCurrentUserSender && m.read && (
                        <i
                          className="fa fa-check-circle"
                          aria-hidden="true"
                          style={{ color: "#e74c3c" }}
                        ></i>
                      )}
                    </div>
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
