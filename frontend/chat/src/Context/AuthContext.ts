import { createSlice } from "@reduxjs/toolkit";


export type AuthState={
	user:{
		id:number|null,
		displayName:string,
		email:string,
		profileImage:string,
	}
}

const initialState:AuthState={
	user:{
		id:null,
		displayName:"",
		email:"",
		profileImage:""
	}
}

const chatState={
	
}
const authSlice=createSlice({
	name:"auth",
	initialState,
	reducers:{
		setUser:(state,actiom)=>{
			state.user.id=actiom.payload.id
			state.user.displayName=actiom.payload.displayName
			state.user.email=actiom.payload.email
			state.user.profileImage=actiom.payload.profileImage
		},
		logOut:(state,action)=>{
			state.user.id=null
			state.user.displayName=""
			state.user.email=""
			state.user.profileImage=""
		}
	}
})
export const {setUser,logOut}=authSlice.actions
export default authSlice.reducer
