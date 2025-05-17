import { Request, Response } from "express";
import prisma from "../db";

export default async (req:Request,res:Response)=>{
    const userid=req.query.id
   
    try {
       const user=await prisma.user.findFirst({
        where:{
            id:Number(userid)
        }
    })
    
   const conversation= await prisma.conversation.findMany({
        where:{
            participants:{
                some:{
                    userId:Number(userid)
                }
            }
        },
        include:{
            participants:true
        }
    })

    // const chats=await prisma.p
    res.json({
        conversation
    }) 
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            msg:"error occured "
        })
    }
    
}