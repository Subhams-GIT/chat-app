import express, { Request, Response } from "express";
import { DbConnect } from "../db";
import prisma from "../db";


export default async (req:Request,res:Response)=>{
  await DbConnect();
    if(!req.session.user){
        res.json({
            success:false,
            message:"user not found"
        })
    }
    const username=req.body.name
    try {
        const userToBeAdded=await prisma.user.findFirst({
            where:{
                displayName:username as string
            }
        })
        if(!userToBeAdded){
            res.json({
                success:false,
                message:"user not found"
            })
        }
        const existingConversation = await prisma.conversation.findFirst({
            where: {
              isGroup: false,
              participants: {
                every: {
                  OR: [
                    { userId: userToBeAdded?.id },
                    { userId: Number.parseInt(req.session.user?.id as string) }
                  ]
                }
              },
            },
            include: {
              participants: true,
            }
          });
          
          if (existingConversation) {
             res.status(200).json({
              success: true,
              message: "Conversation already exists",
              conversation: existingConversation,
            });
          }

        else{
          const conversation= await prisma.conversation.create({
            data:{
                isGroup:false,
                participants:{
                    create:[
                        {user:{connect:{id:userToBeAdded?.id}}},
                        {user:{connect:{id:Number.parseInt(req.session.user?.id||"") }}}
                    ]
                }
            },
           })
           const participant = await prisma.participant.create({
            data: {
              user: {
                connect: { id: userToBeAdded?.id },
              },
              conversation: {
                connect: { id: conversation.id },
              },
            },
          });
           res.status(200).json({
            success: true,
            message: "Participant added to conversation",
            participant,
          });
        }
    } catch (error) {
        console.log(error)
        res.status(409).json({
            success: false,
            message: "error occured",
          });
    }
    return 
}