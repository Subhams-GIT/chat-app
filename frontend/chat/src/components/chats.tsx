import {AuthState, chat} from "@/Context/AuthContext";
import {useSelector} from "react-redux";

interface chats{
	content:String,
	senderId:Number
}
interface conv{
	friend_name:string | undefined,
	all_chats:chats[] | undefined
}

const Chats = () => {
  const user: any = useSelector((state) => state) as AuthState;
  const chats = user.chatreducers.conversation as chat[];
  const currentUserId = user.Authreducers.id;
  console.log(user.Authreducers.id, "user");
	const conversations:conv=[];
  chats.forEach(chat=>{
	chat.participants.forEach(p=>{
		if(p.userId!==user.Authreducers.id)
	})
  })
  
  const otherParticipants = chats[0].participants.filter(
    (p) => p.userId !== currentUserId
  );

  return (
    <div className="w-screen flex justify-center items-center ">
      <div className="w-[50%] text-black inset-0 ">
        {otherParticipants.length > 0 ? (
          otherParticipants.map((participant) => (
            <div key={participant.userId}>User ID: {participant.userId}</div>
          ))
        ) : (
          <div>no other participants</div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Chats;
