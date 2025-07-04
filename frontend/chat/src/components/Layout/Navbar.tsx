import Logo from "../../assets/chat-Logo.png";
import {useSelector} from "react-redux";
import {AuthState} from "@/Context/AuthContext";
import { CircleUserIcon, MenuIcon, SearchCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const Navbar = () => {
  const nav=useNavigate();
  const user: any = useSelector((state) => state) as AuthState;
  const [width,setwidth]=useState(window.innerWidth)
  const userdetails=user.Authreducers

  console.log(user.Authreducers.id, "user");
  console.log(user, "userchats");

  useEffect(()=>{
	const handleresize=()=>setwidth(window.innerWidth);
	window.addEventListener('resize',handleresize)

	return()=>{
		window.removeEventListener("resize", handleresize);
	}
  },[])


  return (
	 <nav className="w-full bg-white py-1 flex justify-center items-center static">
  <div className="w-full max-w-5xl  flex flex-row  md:flex-row items-center bg-black rounded-md justify-between px-2 sm:px-4 gap-2 md:gap-10 h-auto md:h-14 mx-4">
    {/* Logo */}
    <div className="flex items-center gap-2  md:mb-0">
      <img src={Logo} alt="icon" className="h-8 w-10 md:h-8 md:w-10 " />
    </div>

    {/* Search */}
    <div className="flex items-center justify-start  bg-gray-800 rounded-full px-1 py-1 w-[50%] max-w-xs md:max-w-sm mb-1 mt-1">
      <SearchCheckIcon className="text-gray-400 h-5 w-5 mr-2" />
      <input
        type="text"
        className="bg-transparent outline-none text-white placeholder-gray-400 w-[25%]"
        placeholder="Search"
      />
    </div>

	 {/* User Info */}
	{
		width>768?(
			<div className="flex items-center gap-2 hover:cursor-pointer">
      		<CircleUserIcon className="text-white h-6 w-6" onClick={()=>nav('/profile')}/>
      		<span className="text-white text-sm truncate max-w-[100px] md:max-w-none">{userdetails.displayName || "Guest"}</span>
    		</div>
		):(
			<MenuIcon className="text-white"/>
		)
	}
   
    
  </div>
</nav>
   
  );
};

export default Navbar;
