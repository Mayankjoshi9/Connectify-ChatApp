import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import io from "socket.io-client"
import { fetchMessages } from "../../services/messageAPI";
import { addMessage } from "../../slices/message";


const ChatSession = () => {
  const messages = useSelector((state) => state.message.messages);
  const [newMessage, setNewMessage] = useState("");
  const session = useSelector((state) => state.chat.session);
  const curruser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const sessionUser = useSelector((state) => state.chat.sessionUser);
  const socket = useMemo(() => io("http://localhost:4000",
    { transports: ['websocket'], withCredentials: true }), []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages(session._id, token));
  }, [session._id, dispatch, token])

  useEffect(() => {

    socket.emit("join", session._id);
    socket.on("message", (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.emit("leave", session._id)
    }
  }, [dispatch, socket, session._id])




  const sendMessageHandler = (e) => {
    e.preventDefault();
    const message = {
      chatSessionId: session._id,
      senderId: curruser._id,
      content: newMessage,
    }
    socket.emit('sendMessage', message);
    setNewMessage("");
  }



  return (
    <div className='w-[40%] relative h-full flex flex-col bg-lime-300'>
      <div className="w-full h-[10%] bg-blue-400 ">
        {sessionUser.name}
      </div>

      <div className="w-full h-[80%] overflow-y-auto  mb-[100px]">
        {
          messages.map((message, index) => (
            <div key={index} className="flex w-full ">
              <div className="w-[50%] flex justify-start ">
                <div className={`text-red-500 pr-9 ${curruser._id==message.sender._id?"hidden":""}`}>{message.sender.name}</div>
                <div className={`text-gray-900 ${curruser._id==message.sender._id?"hidden":""} `}>{message.content}</div>
              </div>
              <div className="w-[50%] flex justify-end">
                <div className={`text-red-500 pr-9 ${curruser._id==message.sender._id?"":"hidden"}`}>{message.sender.name}</div>
                <div className={`text-gray-900 ${curruser._id==message.sender._id?"":"hidden"} `}>{message.content}</div>
              </div>
            </div>
          ))
        }

      </div>

      <form className="w-full h-[50px] absolute left-0 bottom-[50px]" onSubmit={sendMessageHandler} >
        <input
          className="w-full h-full pl-4 -pt-1 outline-none"
          value={newMessage}
          type="text"
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="type a message..."
        />
        <button type="submit" className="absolute right-10 ">Send</button>
      </form>
    </div>
  )
}

export default ChatSession