import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResults } from "../services/searchApi";
import ChatSession from "../components/chat/ChatSession";
import Profile from "./Profile";
import { CreateSession, fetchChat } from "../services/chatAPI";
import NoSession from "../components/chat/NoSession";
import { setSession, setSessionUser } from "../slices/chat";
import { setChatUsers } from "../slices/chat";
import NavBar from "../components/common/NavBar";
import debounce from 'lodash.debounce';
import SearchResults from '../components/common/SearchResults'
import SearchBar from "../components/common/SearchBar";


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
  const session = useSelector((state) => state.chat.session);

  

  
  
  // Memoize the debounced function
  const debouncedFetchResults = useMemo(() =>
    debounce((query) => {
      dispatch(fetchResults(query, token, setError, setResults, setLoadingSearch));
    }, 300),
    [dispatch, token, setError, setResults, setLoadingSearch]
  );

  const handleInputChange = useCallback(
    (e) => {
      setQuery(e.target.value);
      debouncedFetchResults(e.target.value);
    },
    [debouncedFetchResults] // Use the memoized debounced function
  );

  // Optional: Cancel the debounced function on component unmount
  useEffect(() => {
    return () => {
      debouncedFetchResults.cancel(); // Cancel any pending debounced calls
    };
  }, [debouncedFetchResults]);


  useEffect(() => {
    
    dispatch(fetchChat(token, setChatUsers));
  }, [dispatch,token])

  const handleChat = (currSession, participant) => {
    dispatch(setSession(currSession));
    localStorage.setItem("session", JSON.stringify(currSession));
    dispatch(setSessionUser(participant));
    localStorage.setItem("sessionUser", JSON.stringify(participant));
  }


  const handleSession = async(user) => {
    setQuery("");
    setResults([]);
    
    await dispatch(CreateSession(token, curruser, user, setSession));
    handleChat(session, user);
    dispatch(fetchChat(token, setChatUsers));

  }



  return (
    <div className="w-screen h-screen flex flex-col text-black ">
      <NavBar />

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="w-full h-full flex ">
          <div className="w-[35%] h-full  text-black flex flex-col justify-start items-center">
            <SearchBar query={query} handleInputChange={handleInputChange} loadingSearch={loadingSearch} error={error} />

            {loadingSearch ? (

              <div className=" loader "></div>

            ) : (
              <div className="h-full w-full bg-[#111b21] flex flex-col">
                <SearchResults query={query} results={results} handleSession={handleSession} loadingSearch={loadingSearch} />


                {query == "" &&
                  <div className="w-full h-full overflow-y-auto  space-y-2">
                    {chatUsers.map((chatUser, index) => {
                      const participant = chatUser.participants.find((chat) => chat._id !== curruser._id);
                      const participantName = participant ? participant.name : "Unknown";
                      return (
                        <button
                          key={index}
                          onClick={() => handleChat(chatUser, participant)}
                          className="w-full py-3 px-4 bg-[#2a3942] text-white rounded-b-lg hover:bg-[#3c4f55] transition-colors duration-200 flex items-center space-x-2"
                        >
                          <div className="bg-[#3b4a54] h-10 w-10 rounded-full flex items-center justify-center">
                            {/* Placeholder for user initials or avatar */}
                            {participantName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{participantName}</p>
                            <p className="text-sm text-gray-400">{participant.email}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                }

              </div>

            )}

          </div>

          {session != null ? <ChatSession /> : <NoSession />}

          <Profile />
        </div>
      )}
    </div>
  );
};

export default Home;
