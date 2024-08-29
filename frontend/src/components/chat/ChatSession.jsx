import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { clearAllMessage, fetchMessages } from "../../services/messageAPI";
import { addMessage } from "../../slices/message";
import { IoMdSend } from "react-icons/io";
import bgImg from "../../assets/chatBg.jpg";

const ChatSession = () => {
  const messages = useSelector((state) => state.message.messages);
  const [newMessage, setNewMessage] = useState("");
  const session = useSelector((state) => state.chat.session);
  const curruser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const sessionUser = useSelector((state) => state.chat.sessionUser);
  const dispatch = useDispatch();

  const socket = useMemo(
    () =>
      io("http://localhost:4000", {
        transports: ["websocket"],
        withCredentials: true,
      }),
    []
  );

  const messageContainerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMessages(session._id, token));
  }, [session._id, dispatch, token]);

  useEffect(() => {
    socket.emit("join", session._id);
    
    const handleMessage = (message) => {
      dispatch(addMessage(message));
    };
  
    socket.on("message", handleMessage);
  
    return () => {
      socket.off("message", handleMessage); // Clean up the specific listener
      socket.emit("leave", session._id);
    };
  }, [dispatch, socket, session._id]);
  

  useEffect(() => {
    // Scroll to the bottom of the message container whenever the messages change
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessageHandler = (e) => {
    e.preventDefault();
    const message = {
      chatSessionId: session._id,
      senderId: curruser._id,
      content: newMessage,
    };
    socket.emit("sendMessage", message);
    setNewMessage("");
  };

  const clearHandler=()=>{
     dispatch(clearAllMessage(token,session._id));
     
  }

  return (
    <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 h-full flex flex-col relative border-[1px] border-[#818588]">
      <div className="w-full h-12 bg-[#202c33] flex items-center justify-around">
        <div className="text-white font-semibold">{sessionUser.name}</div>
        <button onClick={clearHandler} className="text-white font-semibold">clear</button>
      </div>

      <div
        ref={messageContainerRef}
        className="h-[530px] flex-col overflow-y-auto p-5 border-none"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              curruser._id === message.sender._id
                ? "justify-end"
                : "justify-start"
            } p-1`}
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
                {message.sender._id==curruser._id?"you":message.sender.name}
              </div>
              <div
                className={`text-base font-medium text-white ${
                  curruser._id === message.sender._id ? "text-right" : ""
                }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form
        className="w-full h-[70px] p-3 bg-[#202c33] absolute bottom-0 flex items-center"
        onSubmit={sendMessageHandler}
      >
        <input
          className="flex-1 h-12 p-3 bg-[#2a3942] text-white outline-none rounded-md"
          value={newMessage}
          type="text"
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          type={newMessage === "" ? "reset" : "submit"}
          className="ml-3"
        >
          <IoMdSend className="w-8 h-8 text-green-300" />
        </button>
      </form>
    </div>
  );
};

export default ChatSession;
