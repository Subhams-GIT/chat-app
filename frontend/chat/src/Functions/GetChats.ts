
import { AuthState } from "@/Context/AuthContext";
import api from "@/lib/axios";
import { useSelector } from "react-redux";
export default async function GetChats() {
	
	const chats = await api.get(`/chats`, {
		withCredentials: true
	})
	return chats
}