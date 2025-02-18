import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResults } from "../services/searchApi";
import ChatSession from "../components/chat/ChatSession";
import { CreateSession, fetchChat } from "../services/chatAPI";
import NoSession from "../components/chat/NoSession";
import  { addChatUsers, setSession, setSessionUser } from "../slices/chat";
import { setChatUsers } from "../slices/chat";
import NavBar from "../components/common/NavBar";
import debounce from 'lodash.debounce';
import SearchResults from '../components/common/SearchResults'
import SearchBar from "../components/common/SearchBar";
import { MdOutlineGroups } from "react-icons/md";
import io from "socket.io-client";
import { Serverurl } from '../config';



const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  const curruser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const chatUsers = useSelector((state) => state.chat.chatUsers);
  let session = useSelector((state) => state.chat.session);


  const socket = useMemo(
      () =>
        io(Serverurl, {
          transports: ["websocket"],
          withCredentials: true,
        }),
      []
    );


  // Memoize the debounced function
  const debouncedFetchResults = useMemo(() =>
    debounce((query) => {
      fetchResults(query, token, setError, setResults, setLoadingSearch);
    }, 300),
    [ token, setError, setResults, setLoadingSearch]
  );

  const handleInputChange = useCallback(
    (e) => {
      setQuery(e.target.value);
      debouncedFetchResults(e.target.value);
    },
    [debouncedFetchResults] // Use the memoized debounced function
  );

  // Cancel the debounced function on component unmount
  useEffect(() => {
    return () => {
      debouncedFetchResults.cancel(); // Cancel any pending debounced calls
    };
  }, [debouncedFetchResults]);


  useEffect(() => {
    dispatch(fetchChat(token, setChatUsers));
  }, [dispatch, token])

  const handleChat = async (currSession, participant) => {
   
    dispatch(setSession(currSession));
    localStorage.setItem("session", JSON.stringify(currSession));
    
    if(!Array.isArray(participant)){
      dispatch(setSessionUser(participant));
      localStorage.setItem("sessionUser", JSON.stringify(participant));

    }   
    

  }
  
  useEffect(()=>{
    socket.on("sessionCreated",
      (sessionId)=>{
        dispatch(addChatUsers(sessionId));
      }
    )
  },[dispatch,socket])

  const handleSession = async (user) => {
    setQuery("");
    setResults([]);

   const session1=await dispatch(CreateSession(token, curruser, user, setSession));
    socket.emit("CreateSession",session1?._id,[curruser?._id,user?._id]);
    handleChat(session1, user);
    dispatch(fetchChat(token, setChatUsers));

  }

  return (
    <div className="w-screen h-screen flex flex-col text-black ">

      <NavBar socket={socket}/>

      {loading ? (
        <div className="loader"></div>
      ) : (

        <div className="w-screen h-screen flex ">

          <div className={`md:w-[50%] ${session?"w-0":"w-full"}  h-full  text-black flex flex-col justify-start items-center`}>
            <SearchBar query={query} handleInputChange={handleInputChange} loadingSearch={loadingSearch} error={error} />

            {loadingSearch ? (

              <div className=" loader "></div>

            ) : (
              <div className="h-full w-full bg-primary flex flex-col">
                <SearchResults query={query} results={results} handleSession={handleSession} loadingSearch={loadingSearch} />


                {query == "" &&
                  <div className="w-full h-full overflow-y-auto  space-y-1">
                    {chatUsers.map((chatUser, index) => {
                      const isGroup=chatUser.isGroup;
                      if(isGroup===false){
                      const participant = chatUser.participants.filter((chat) => chat._id !== curruser._id);
                      const participantName = participant[0] ? participant[0].name : "Unknown";
                      return (
                        <button
                          key={index}
                          onClick={() => handleChat(chatUser, participant[0])}
                          className="w-full py-3 px-4 bg-chat text-white rounded-b-lg hover:bg-[#3c4f55] transition-colors duration-200 flex items-center space-x-2"
                        >
                          <div className="bg-parti h-10 w-10 rounded-full flex items-center justify-center">
                            <img src={participant[0].additionalDetails?.image} alt="" className="rounded-full" />
                          </div>
                          <div>
                            <p className="font-medium">{participantName}</p>
                            <p className="text-sm text-gray-400">{chatUser.lastMessage}</p>
                          </div>
                        </button>
                      );
                      }
                      else{
                        const groupName=chatUser.groupName;
                        return(
                          <button
                           key={index}
                           onClick={()=>handleChat(chatUser,chatUser.participants)}
                          className="w-full py-3 px-4 bg-chat text-white rounded-b-lg hover:bg-[#3c4f55] transition-colors duration-200 flex items-center space-x-2"
                          >
                            <div className="bg-parti h-10 w-10 rounded-full flex items-center justify-center">
                            
                            <MdOutlineGroups className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-medium">{groupName}</p>
                            <p className="text-sm text-gray-400">{chatUser.lastMessage}</p>
                          </div>
                          </button>
                        );

                      }
                      
                    })}
                  </div>
                }

              </div>

            )}

          </div>


          <div className={`md:w-full ${session?"w-full":"w-0"}  `}>
          {session != null ? <ChatSession handleSession={handleSession} socket={socket} /> : <NoSession />}
            
          </div>


        </div>
      )}
    </div>
  );
};

export default Home;
