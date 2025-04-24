import { Signup } from "@/Schemas/SignupSchema";
import api from "@/lib/axios";
export default async function SignupUser({username,email,Password}:Signup) {

    const res=await api.post('/signup',{
        username,
        email,
        password:Password
    })

    if(res.status===400){
        return new Error('SIGNUP_ERROR')
    }
    return 200;


}