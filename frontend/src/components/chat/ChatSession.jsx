import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../services/messageAPI";
import { addMessage } from "../../slices/message";
import { IoMdSend } from "react-icons/io";
import bgImg from "../../assets/chatBg.jpg";
import GroupChatModel from "../models/GroupChatModel.jsx";
import PropTypes from "prop-types";
import ProfileModel from "../models/ProfileModel";

const ChatSession = ({ socket, handleSession }) => {
  const messages = useSelector((state) => state.message.messages);
  const [newMessage, setNewMessage] = useState("");
  const session = useSelector((state) => state.chat.session);
  const curruser = useSelector((state) => state.auth.user);
  const sessionUser = useSelector((state) => state.chat.sessionUser);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [chatLoader, setChatLoader] = useState(true);

  const messageContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchMessages(session._id, token));
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setChatLoader(false);
      }
    };

    fetchData();
  }, [session._id, dispatch, token]);

  useEffect(() => {
    socket.emit("join", session._id);

    const handleMessage = (message) => {
      dispatch(addMessage(message));
    };

    socket.on("message", handleMessage);
    return () => {
      socket.off("message", handleMessage);
    };
  }, [dispatch, socket, session._id]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessageHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMessage.trim()) return;

      const message = {
        chatSessionId: session._id,
        senderId: curruser._id,
        content: newMessage.trim(),
      };

      socket.emit("sendMessage", message);
      setNewMessage("");
    },
    [newMessage, session._id, curruser._id, socket]
  );

  const renderedMessages = useMemo(
    () =>
      messages.map((message, index) => (
        <div
          key={index}
          className={`flex p-1 ${
            curruser._id === message.sender._id
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`max-w-[500px] px-2 py-3 rounded-md ${
              curruser._id === message.sender._id
                ? "bg-[#005c4b]"
                : "bg-gray-600"
            }`}
          >
            <div
              className={`text-sm ${
                curruser._id === message.sender._id
                  ? "text-right text-green-400 font-bold"
                  : "text-purple-300 font-bold"
              }`}
            >
              {message.sender._id === curruser._id ? "You" : message.sender.name}
            </div>
            <div
              className={`text-base flex flex-col font-medium text-white ${
                curruser._id === message.sender._id ? "text-right" : ""
              }`}
            >
              {message.content}
              <small>{new Date(message.createdAt).toLocaleString()}</small>
            </div>
          </div>
        </div>
      )),
    [messages, curruser._id]
  );

  return (
    <div className="w-full h-full flex flex-col relative border-x-[1px] border-[#3d3f41]">
      <div className="w-full h-12 pl-[20px] pr-[100px] bg-[#202c33] flex justify-between items-center z-0">
        {session.isGroup ? (
          <GroupChatModel handleSession={handleSession} />
        ) : (
          <ProfileModel user={sessionUser} />
        )}
      </div>

      <div
        ref={messageContainerRef}
        className="h-full flex-col overflow-y-auto p-5 border-none z-0"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        {chatLoader ? (
          <div className="w-full h-full flex justify-center items-center pt-[200px]">
            <div className="lds-spinner">
              {[...Array(12)].map((_, i) => (
                <div key={i}></div>
              ))}
            </div>
          </div>
        ) : (
          renderedMessages
        )}
      </div>

      <form
        className="w-full h-[70px] p-3 bg-search absolute bottom-0 flex items-center z-0"
        onSubmit={sendMessageHandler}
      >
        <input
          className="flex-1 h-12 p-3 bg-input text-white outline-none rounded-md"
          value={newMessage}
          type="text"
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" disabled={!newMessage.trim()} className="ml-3">
          <IoMdSend className="w-8 h-8 text-green-300" />
        </button>
      </form>
    </div>
  );
};

ChatSession.propTypes = {
  socket: PropTypes.object.isRequired,
  handleSession: PropTypes.func.isRequired,
};

export default ChatSession;
