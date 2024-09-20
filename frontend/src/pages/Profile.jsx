import { useSelector } from "react-redux";
import ProfileComp from "../components/common/ProfileComp";


const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="w-[30%] h-full " >
     <ProfileComp user={user}/>
    </div>
  );
}

export default Profile;
