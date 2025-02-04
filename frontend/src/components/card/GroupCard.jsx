import { useSelector } from "react-redux"
import { MdOutlineGroups } from "react-icons/md"
import ProfileModel from "../models/ProfileModel";
import { IoChatboxEllipses } from "react-icons/io5";
import PropTypes from "prop-types";


const GroupCard = ({handleSession}) => {
    const session = useSelector((state) => state.chat.session);
    const curruser=useSelector((state)=>state.auth.user);
    return (
        <div className="text-white md:p-2 p-1">
            <div className="flex w-full h-full gap-5">
                <div className="bg-parti h-10 w-10 rounded-full flex items-center justify-center">

                    <MdOutlineGroups className="w-8 h-8" />
                </div>
                <div className="text-white text-xl font-semibold">{session?.groupName}</div>
            </div>

            <ul className="mt-5">
                {
                    session?.participants.map((user) => (
                        <li key={user._id} className="text-white flex  p-4 m-1 pr-12  w-full h-[70px] border border-gray-500  rounded-lg border-white">
                           <ProfileModel user={user}/>
                           {(user._id!=curruser._id) && <button onClick={()=>handleSession(user)} className="flex justify-center item-center  "><IoChatboxEllipses  className="w-[100%] min-w-[20px] min-h-[20px] h-[100%]"/></button>}
                        </li>
                    ))
                }
            </ul>



        </div>
    )
}
GroupCard.propTypes = {
  
  handleSession:PropTypes.func.isRequired
};
export default GroupCard;