import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { LoaderCircle } from "lucide-react";
import Chats from "./chats";
import Navbar from "./Layout/Navbar";
import GetUser from "@/Functions/GetUser";
import { setchats, setUser } from "@/Context/AuthContext";
import GetChats from "@/Functions/GetChats";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const userRes = await GetUser();
        dispatch(setUser(userRes.user))
         const chatsRes = await GetChats();
         console.log(chatsRes ,'chats')
         dispatch(setchats(chatsRes.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [dispatch]);
  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center font-bold animate-spin text-black">
        <LoaderCircle />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Chats/>
    </div>
  );
};

export default Dashboard;
