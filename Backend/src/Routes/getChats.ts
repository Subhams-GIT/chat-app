import Express  from "express";
import getChats from "../Controller/getChats";

const router=Express.Router()
export default router.get(`/chats`,getChats)