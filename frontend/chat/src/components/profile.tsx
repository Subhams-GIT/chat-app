import {AuthState} from "@/Context/AuthContext";
import { useState } from "react";
import {useSelector} from "react-redux";
const ChatProfile = () => {
	const Authreducer: any = useSelector((state) => state) as AuthState;
	const user = Authreducer.Authreducers;
	const [updatedSet,setUpdatedSet]=useState(
		{
			username:user.displayName,
			profile:user.profileImage,
			email:user.email,
			password:user.password
		}
	);

	const channgehandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
		const name=e.target.name;
		const value=e.target.value;

		setUpdatedSet(updates=>({
			... updates,name:value
		}))
	}
  
	const submit=async ()=>{
		
	}
  return (
    <div className=" flex justify-start items-center flex-col h-screen max-w-screen w-screen bg-white rounded-xl shadow-md p-6 text-center">
      <form action="">
        <img
          src={user.profileImage}
          alt={`${user.displayName}'s avatar`}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-blue-500"
        />
      </form>

      <input
        className="text-xl font-semibold text-gray-800 text-center"
        readOnly
        value={user.displayName}
      />
      <input
        className="text-xl font-semibold text-gray-800 text-center"
        readOnly
        value={user.email}
      />

      <div className="flex flex-col justify-center items-center pt-4 px-5 gap-2">
        <span className="text-bold bg-blue-500 rounded-4xl px-2 py-1">
          Change your password
        </span>
        <div className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            placeholder="current Password"
            className="text-xl  text-gray-800 text-center border-1 rounded-2xl"
          />
          <input
            type="text"
            placeholder="new Password"
            className="text-xl  text-gray-800 text-center border-1 rounded-2xl"
          />
        </div>
        <button className="p-2 border-0 rounded-full bg-gray-400">
          update
        </button>
      </div>
    </div>
  );
};

export default ChatProfile;
