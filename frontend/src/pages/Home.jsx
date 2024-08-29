import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../services/searchApi";
import ChatSession from "../components/chat/ChatSession";
import Profile from "../components/chat/Profile";
import { CreateSession, fetchChat } from "../services/chatAPI";
import NoSession from "../components/chat/NoSession";
import { setSession, setSessionUser } from "../slices/chat";
import { setChatUsers } from "../slices/chat";
import NavBar from "../components/common/NavBar";



const Home = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  
  const loading = useSelector((state) => state.auth.loading);
  const curruser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const chatUsers = useSelector((state) => state.chat.chatUsers);
  const sessionUser = useSelector((state) => state.chat.sessionUser);


  useEffect(() => {
    dispatch(fetchChat(token, setChatUsers));
  }, [dispatch, token])

  const handleChat = (currSession, participant) => {
    dispatch(setSession(currSession));
    localStorage.setItem("session", JSON.stringify(currSession))
    dispatch(setSessionUser(participant));
    localStorage.setItem("sessionUser", JSON.stringify(participant));
  }


  const sessionHandler = (e) => {
    e.preventDefault();
    setSearch("");
    dispatch(CreateSession(token, curruser, sessionUser, setSession));
  };

  const session = useSelector((state) => state.chat.session);

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(searchUser(token, search));
  };


  return (
    <div className="w-screen h-screen flex flex-col text-black ">
      <NavBar/>

      {loading ? (
        <div className="loader">Loading</div>
      ) : (
        <div className="w-full h-full flex ">
          <div className="w-[35%] h-full  text-black flex flex-col justify-start items-center">
            <div className="w-full h-[8%] flex flex-col bg-black">
             
                <form
                  onSubmit={searchHandler}
                  className="flex justify-center items-center w-full relative h-full p-1 bg-slate-200  "
                >
                  <input
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    className="h-full w-full pl-[20px] border border-gray-300 focus:outline-blue-600 "
                    placeholder="Search..."
                  />

                  <button type="submit" className="flex ">
                    <FaSearch className="text-xl text-center absolute right-7 top-3" />
                  </button>
                </form>
              
            </div>

            <div className="h-full w-full  bg-[#111b21]">
              <div className=" w-full overflow-y-auto">
                {sessionUser == null ? (
                  <></>
                ) : (
                  <button
                    onClick={sessionHandler}
                    className="bg-pink-500 flex justify-around text-black w-full h-[40px] "
                  >
                    <p className="text-[20px]">{sessionUser.name}</p>
                    <p className="text-[15px]">{search}</p>
                  </button>
                )}
              </div>

              <div className="w-full h-[100%]  overflow-y-auto ">
                {chatUsers.map((chatUser, index) => {
                  const participant = chatUser.participants.filter(chat => chat._id !== curruser._id)[0];
                  const participantName = participant ? participant.name : 'Unknown';
                  return (<button key={index} onClick={() => (handleChat(chatUser, participant))} className="w-full h-[30px] bg-slate-400 border-black border-2">
                    {participantName}
                  </button>
                  )
                }
                )}
              </div>


            </div>
          </div>

          {session != null ? <ChatSession /> : <NoSession />}

          <Profile />
        </div>
      )}
    </div>
  );
};

export default Home;
