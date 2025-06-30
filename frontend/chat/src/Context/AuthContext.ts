import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ActivityIcon } from "lucide-react";

export type AuthState = {
	id: number | null,
	displayName: string,
	email: string,
	profileImage: string,

}
export type message = {
	id: number,
	conversationid: number,
	senderId: number,
	content: string
}
export type participant = {
	userId: number,
	conversationId: number
}
export type chat = {
	conversationid: number,
	name: string,
	messages: message[],
	participants: participant[]
}
const initialState: AuthState = {
	id:null,
	displayName:"",
	profileImage:"",
	email:""
}

const initialChatState: chat[] = []
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<AuthState>) => {
			return  action.payload;
			
		}
	}
});

const chatSlice = createSlice({
	name: "chats",
	initialState: initialChatState,
	reducers: {
		setchats: (state, action: PayloadAction<chat[]>) => {
			return action.payload; // Replace state with new chats array
		}
	}
});
export const { setUser } = authSlice.actions
export const { setchats } = chatSlice.actions
export const chatreducers = chatSlice.reducer
export default authSlice.reducer
