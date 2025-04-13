import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../services/messageAPI";
import { addMessage, clearMessages } from "../../slices/message";
import { IoMdSend } from "react-icons/io";
import GroupChatModel from "../models/GroupChatModel.jsx";
import PropTypes from "prop-types";
import ProfileModel from "../models/ProfileModel";
import { setSession } from "../../slices/chat";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./ChatSession.css";



const ChatSession = ({ socket, handleSession }) => {
  const messages = useSelector((state) => state.message.messages);
  const [newMessage, setNewMessage] = useState("");
  const session = useSelector((state) => state.chat.session);
  const curruser = useSelector((state) => state.auth.user);
  const sessionUser = useSelector((state) => state.chat.sessionUser);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [chatLoader, setChatLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [fetchChatMessages, setFetchChatMessages] = useState(false);

  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (session?._id) {
      dispatch(clearMessages());
      setPage(1);
      setHasMoreMessages(true);
      setChatLoader(true);
    }
  }, [session._id, dispatch]);


  useEffect(() => {
    const fetchData = async () => {
      if (!hasMoreMessages) return;

      setFetchChatMessages(true);
      try {
        await dispatch(fetchMessages(session._id, token, page, setHasMoreMessages));
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setFetchChatMessages(false);
        setChatLoader(false);
      }
    };
    if (session?._id) fetchData();
  }, [session._id, dispatch, token, page, hasMoreMessages]);

  const handleBottomScroll = useCallback(() => {
    if (messageContainerRef.current && !chatLoader && messages.length > 0) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages, chatLoader]);

  useEffect(() => {
    socket.emit("join", session._id);

    const handleMessage = async (message) => {
      await dispatch(addMessage(message));
      handleBottomScroll();
    };

    socket.on("message", handleMessage);
    return () => {
      socket.off("message", handleMessage);
    };
  }, [dispatch, socket, session._id, handleBottomScroll]);



  useEffect(() => {
    handleBottomScroll();
  }, [chatLoader, handleBottomScroll]);

  const handleScroll = useCallback(() => {
    const container = messageContainerRef.current;
    if (container && container.scrollTop < 20 && hasMoreMessages && !chatLoader && !fetchChatMessages) {
      setPage((prev) => prev + 1);
    }
  }, [hasMoreMessages, fetchChatMessages, chatLoader]);

  useEffect(() => {
    const container = messageContainerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);


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
          className={`flex p-1 ${curruser._id === message.sender._id
            ? "justify-end"
            : "justify-start"
            }`}
        >
          <div
            className={`max-w-[500px] px-2 py-3 rounded-md ${curruser._id === message.sender._id
              ? "bg-[#005c4b] rounded-br-none"
              : "bg-gray-600 rounded-bl-none"
              }`}
          >
            <div
              className={`text-sm ${curruser._id === message.sender._id
                ? "text-right text-green-400 font-bold"
                : "text-purple-300 font-bold"
                }`}
            >
              {message.sender._id === curruser._id ? "You" : message.sender.name}
            </div>
            <div
              className={`text-base flex flex-col font-medium text-white ${curruser._id === message.sender._id ? "text-right" : ""
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
    <div className="w-full h-full flex flex-col relative border-x-[1px] border-[#3d3f41] ">

      <div className="w-full h-[10%] pl-[5%] pr-[2%] bg-[#202c33] flex justify-between items-center z-0">
        <div className="flex gap-2">
          <button onClick={() => dispatch(setSession(null))} className="text-white md:hidden"><IoMdArrowRoundBack className="w-[20px] h-[20px]" /></button>
          {session.isGroup ? (
            <GroupChatModel handleSession={handleSession} />
          ) : (
            <ProfileModel user={sessionUser} />
          )}
        </div>
      </div>

      <div
        ref={messageContainerRef}
        className="relative h-[75%]  overflow-y-auto px-4 border-none z-0"
        style={{ backgroundImage: `url("assets/chatBg.jpg")` }}
      >
        {chatLoader ? (
         <div className="w-[80%] md:w-[60%] h-full fixed ">
          <div className="skeleton-wrapper">
            {[...Array(6)].map((_, index) => (
              <div key={index} className={`skeleton-bubble ${index % 2 === 0 ? "other" : "user"}`}>
                <div className="flex flex-col w-full">
                  <div className="skeleton-text"></div>
                  <div className="skeleton-time"></div>
                </div>
              </div>
            ))}
          </div>
          </div>

        ) : (
          <div className="w-full h-[200px] flex flex-col "
          >
            {fetchChatMessages && (
              <div className="top-loader">
                <div className="lds-spinner">{[...Array(12)].map((_, i) => <div key={i}></div>)}</div>
              </div>
            )}
            {renderedMessages}



          </div>


        )}
      </div>



      <form
        className="w-full h-[15%] absolute bottom-0  px-3 py-1  bg-search flex items-center z-0"
        onSubmit={sendMessageHandler}
      >
        <input
          className="flex-1 h-[70%] p-4 bg-input text-white outline-none rounded-md"
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


