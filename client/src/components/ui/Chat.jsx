import { useDispatch, useSelector } from "react-redux";
import { capitalize, formatTimestamp } from "../../utils";
import { hideLoader, setAllChats, showLoader, Store } from "../../redux";
import { clearUnreadMsgCount, getMessagesForChat, message } from "../../apis";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { formatISO } from "date-fns";
import EmojiPicker from "emoji-picker-react";

export const ChatArea = ({ socket }) => {
  const { selectedChat, user, allChats } = useSelector(
    (state) => state.userReducer,
  );
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    setText(e.target.value);

    socket.emit("user-typing", {
      chatId: selectedChat.chatId,
      members: selectedChat.members.map((m) => m._id),
      sender: user._id,
    });
  };

  const selectedUser = selectedChat.members.find((u) => u._id !== user._id);

  const sendMessage = async (image = "") => {
    try {
      const msg = {
        chatId: selectedChat._id,
        text,
        image,
      };

      socket.emit("send-msg", {
        ...msg,
        members: selectedChat.members.map((m) => m._id),
        sender: user._id,
        read: false,
        createdAt: formatISO(Date.now()),
      });

      const res = await message(msg);

      if (res.success) {
        setText("");
        setShowEmojiPicker(false);
      }
    } catch (error) {
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
      socket.emit("clr-unread-msg", {
        chatId: selectedChat._id,
        members: selectedChat.members.map((m) => m._id),
      });
      res = await clearUnreadMsgCount(payload);

      if (res.success) {
        allChats.map((chat) => {
          if (chat._id === selectedChat._id) {
            return res.data;
          }
          return chat;
        });
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchAllMessages();
    if (selectedChat?.lastMessage?.sender !== user._id) {
      resetUnreadMessages();
    }

    socket.off("receive-msg").on("receive-msg", (msg) => {
      const selectedChat = Store.getState().userReducer.selectedChat;

      if (selectedChat._id === msg.chatId) {
        setAllMessages((prevmsg) => [...prevmsg, msg]);
      }

      if (selectedChat._id === msg.chatId && msg.sender !== user._id)
        resetUnreadMessages();
    });

    // TODO: fix IRT unread message count display
    socket.on("msg-count-cleared", (chat) => {
      const selectedChat = Store.getState().userReducer.selectedChat;
      const allChats = Store.getState().userReducer.allChats;

      if (selectedChat._id === chat.chatId) {
        const updatedChats = allChats.map((c) => {
          if (c._id === chat.chatId) {
            return { ...c, unreadMessageCount: 0 };
          }
          return c;
        });

        dispatch(setAllChats(updatedChats));

        setAllMessages((prevmsg) => {
          return prevmsg.map((msg) => {
            return { ...msg, read: true };
          });
        });
      }
    });

    // TODO: fix started-typing display
    socket.on("started-typing", (chat) => {
      if (selectedChat._id === chat.chatId && chat.sender !== user._id) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    });
  }, [selectedChat]);

  useEffect(() => {
    const messageContainer = document.getElementById("main-chat-area");
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }, [allMessages, isTyping]);

  const sendImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);

    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      sendMessage(reader.result);
    };
  };

  return (
    <>
      {selectedChat && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">{`${capitalize(selectedUser.firstname)} ${capitalize(selectedUser.lastname)}`}</div>
          <div className="main-chat-area" id="main-chat-area">
            {allMessages.map((m, index) => {
              const isCurrentUserSender = m?.sender === user._id;

              return (
                <div
                  className="message-container"
                  style={
                    isCurrentUserSender
                      ? { justifyContent: "end" }
                      : { justifyContent: "start" }
                  }
                  key={index}
                >
                  <div>
                    <div
                      className={
                        isCurrentUserSender
                          ? "send-message"
                          : "received-message"
                      }
                    >
                      <div>{m.text}</div>
                      <div>
                        {m?.image && (
                          <img
                            src={m?.image}
                            alt="message-image"
                            height="120"
                            width="120"
                          />
                        )}
                      </div>
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
            <div className="typing-indicator">
              {isTyping &&
                selectedChat?.members
                  .map((m) => m._id)
                  .includes(data?.sender) && <i>typing...</i>}
            </div>
          </div>
          {showEmojiPicker && (
            <div
              style={{
                width: "100%",
                display: "flex",
                padding: "0px 20px",
                justifyContent: "right",
              }}
            >
              <EmojiPicker
                style={{ width: "300px", height: "400px" }}
                onEmojiClick={(e) => setText(text + e.emoji)}
              />
            </div>
          )}
          <div className="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
              value={text}
              onChange={handleChange}
            />

            <label htmlFor="file">
              <i className="fa fa-picture-o send-image-btn"></i>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                accept="image/jpg,image/png,image/jpeg,image/gif"
                onChange={() => sendImage("")}
              />
            </label>

            <button
              className="fa fa-smile-o send-emoji-btn"
              aria-hidden="true"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            ></button>
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
