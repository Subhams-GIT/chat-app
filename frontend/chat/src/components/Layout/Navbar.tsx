
import Logo from '../../assets/chat-Logo.png'
import { useSelector } from 'react-redux'
import { AuthState } from '@/Context/AuthContext'
const Navbar = () => {
	 const user:AuthState=useSelector(state=>state) as AuthState
	 console.log(user.user ,'user')
  return (
	<div className='flex justify-start items-center w-screen bg-white h-15'>
		<img src={Logo} alt="chat-logo" className='h-13 w-13 text-white object-contain ml-10 scale-100'/>

		<button>{ }</button>
	</div> 
  )
}

export default Navbar