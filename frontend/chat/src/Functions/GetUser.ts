
import api from "@/lib/axios";
export default async function GetUser() {

  const user= await api.get('/session',{
	withCredentials:true
   })
   return user
}