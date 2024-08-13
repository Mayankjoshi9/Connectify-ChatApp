import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { logout } from "../services/authAPI";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchUser } from "../services/searchApi";
import ChatSession from "../components/chat/ChatSession";
import Profile from "../components/chat/Profile";
import { CreateSession, fetchChat } from "../services/chatAPI";
import NoSession from "../components/chat/NoSession";
import { setSession, setSessionUser } from "../slices/chat";
import { setChatUsers } from "../slices/chat";



const Home = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div className="w-screen h-screen flex flex-col  text-black ">
      <nav className="bg-slate-800 w-full h-[8%] flex justify-between items-center">
        <button>
          <CgProfile className="text-[50px] text-yellow-200"></CgProfile>
        </button>
        <button
          className="w-[100px] h-[50px] bg-red-500"
          onClick={() => {
            dispatch(logout(navigate));
          }}
        >
          Logout
        </button>
      </nav>

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

            <div className="h-full w-full  bg-green-100">
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
