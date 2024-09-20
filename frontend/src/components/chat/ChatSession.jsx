import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { clearAllMessage, fetchMessages } from "../../services/messageAPI";
import { addMessage } from "../../slices/message";
import { IoMdSend } from "react-icons/io";
import bgImg from "../../assets/chatBg.jpg";
import ProfileComp from "../common/ProfileComp";
import { IoMdArrowRoundBack } from "react-icons/io";

const ChatSession = () => {
  const messages = useSelector((state) => state.message.messages);
  const [newMessage, setNewMessage] = useState("");
  const session = useSelector((state) => state.chat.session);
  const curruser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const sessionUser = useSelector((state) => state.chat.sessionUser);
  const [profile, SetProfile] = useState(false);
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

  const clearHandler = () => {
    dispatch(clearAllMessage(token, session._id));

  }
  console.log(sessionUser);





  return (
    <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 h-full flex flex-col relative border-x-[1px] border-[#3d3f41] ">

      {profile && (<div className="w-[50%] h-full flex justify-start absolute bg-slate-700 z-10">
        <ProfileComp user={sessionUser} />
        <button className="absolute right-7 top-2 text-4xl text-white w-[20px] h-[30px]" onClick={() => SetProfile(false)}>
          <IoMdArrowRoundBack />

        </button>

      </div>)}


      <div className="w-full h-12 bg-[#202c33] flex items-center z-0"  >
        <div className="flex w-[400px] h-full  gap-5 pt-1 pl-20 mr-10 cursor-pointer " onClick={() => SetProfile(true)}>
          <img className="w-[35px] h-[35px] rounded-full" src={sessionUser.additionalDetails.image} />
          <div className="text-white text-xl font-semibold">{sessionUser.name}</div>
        </div>

        <button onClick={clearHandler} className="w-[40px] h-[20px] text-white font-semibold">clear</button>
      </div>

      <div
        ref={messageContainerRef}
        className="h-[540px] flex-col overflow-y-auto p-5 border-none z-0"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex p-1 ${curruser._id === message.sender._id
              ? "justify-end"
              : "justify-start"
              }`}
          >
            <div
              className={`max-w-[500px] px-2 py-3 rounded-md ${curruser._id === message.sender._id
                ? "bg-[#005c4b]"
                : "bg-gray-600"
                }`}
            >
              <div
                className={`text-sm ${curruser._id === message.sender._id
                  ? "text-right text-green-400 font-bold" : "text-purple-300 font-bold"}`}
              >
                {message.sender._id == curruser._id ? "you" : message.sender.name}
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
        ))}
      </div>

      <form
        className="w-full h-[70px] p-3 bg-[#202c33] absolute bottom-0 flex items-center z-0"
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
