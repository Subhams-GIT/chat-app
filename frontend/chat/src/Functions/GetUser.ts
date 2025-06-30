
import api from "@/lib/axios";
export default async function GetUser() {

  const user = await api.get('/session', {
    withCredentials: true
  })
  console.log(user.data ,'from backend')
  return user.data
}