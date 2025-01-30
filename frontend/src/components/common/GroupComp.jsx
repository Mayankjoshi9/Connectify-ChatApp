
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import debounce from 'lodash.debounce';
import SearchResults from './SearchResults'
import SearchBar from "./SearchBar";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { fetchResults } from "../../services/searchApi";
import {useDispatch} from "react-redux"
import { CreateGroup } from '../../services/chatAPI';
import PropTypes from "prop-types";
import { addChatUsers } from '../../slices/chat';


const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export default function GroupComp({handleClose,socket}) {
    const [info, setInfo] = useState({
        chatName: "",
        users: [],
    });
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loadingSearch, setLoadingSearch] = useState(false);

    const token = useSelector((state) => state.auth.token);
    const dispatch=useDispatch();
    const session=useSelector((state)=> state.chat.session);
    const groupUsers=useSelector((state)=>state.chat.groupUsers);


    // Memoize the debounced function
    const debouncedFetchResults = useMemo(() =>
        debounce((query) => {
            fetchResults(query, token, setError, setResults, setLoadingSearch);
        }, 300),
        [token, setError, setResults, setLoadingSearch]
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


    const handleSession = (user) => {
        setQuery("");
        setResults([]);
        setInfo((prevInfo) => {
            const userExits = prevInfo.users.some(existingUser => existingUser._id === user._id)
            if (userExits) {
                return prevInfo;
            }
            return {
                ...prevInfo,
                users: [...prevInfo.users, user],
            }
        });


    }
    


    const handleDelete = (userToDelete) => () => {
        setInfo((info) => {
            const leftUsers = info.users.filter((user) => user._id !== userToDelete._id);
            return {
                ...info,
                users: leftUsers
            }

        });
    };
    
    useEffect(()=>{
        socket.on("sessionCreated",
          (sessionId)=>{
            dispatch(addChatUsers(sessionId));
          }
        )
      },[dispatch,socket])

    const submitHandler=async(e)=>{
        e.preventDefault();
        const data=info.users.map((user)=>user._id);
        await dispatch(CreateGroup(token,info.chatName,data));
        socket.emit("CreateSession",session._id,groupUsers);
        handleClose();
    }

    return (
        <>
            <form onSubmit={submitHandler} className="flex flex-col w-full h-full p-10 ">
                <h1 className="flex justify-center text-4xl ">Create Group Chat</h1>
                <TextField id="outlined-basic" label="Chat Name" value={info.chatName} onChange={(e) => setInfo((prevInfo) => ({ ...prevInfo, chatName: e.target.value, }))}
                 variant="outlined" sx={{
                    my:4
                 }}
                   
                 />
                
                <SearchBar  query={query} handleInputChange={handleInputChange} loadingSearch={loadingSearch} error={error} />
                {loadingSearch ? (

                    <div className=" loader "></div>

                ) : (<SearchResults query={query} results={results} handleSession={handleSession} loadingSearch={loadingSearch} />)}

                <Paper
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 0.5,
                        m: 0,
                    }}
                    component="ul"
                >
                    {info.users.map((data) => {

                        return (
                            <ListItem key={data._id}>
                                <Chip
                                    label={data.name}
                                    onDelete={handleDelete(data)}
                                />
                            </ListItem>
                        );
                    })}
                </Paper>


                <Button type="submit" sx={{margin:5}} variant="contained">Create Group</Button>


            </form>


        </>

    );
}

GroupComp.propTypes = {
  socket: PropTypes.object.isRequired, 
  handleClose:PropTypes.func.isRequired,
};