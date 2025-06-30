import { Request, Response } from "express";
import prisma from "../db";

interface Ids {
    id: number
}
export default async (req: Request, res: Response) => {
    const userid = req.session.user?.id

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: Number(userid)
            }
        })

        const conversation = await prisma.conversation.findMany({
            where: {
                participants: {
                    some: {
                        userId: Number(userid)
                    }
                }
            },
            include: {
                participants:{
                    include:{
                        user:{
                            select:{
                                id:true,
                                displayName:true,
                                profileImage:true
                            }
                        }
                    }
                },
                messages: {
                    orderBy:{
                        sentAt:'desc'
                    },
                    take:1
                }
            }
        })

        const friendIds = conversation
            .flatMap(c =>
                c.participants
                    .filter(p => p.userId !== Number(userid))
                    .map(p => p.userId)
            );

        console.log('friends Ids', friendIds);
        let names:string[]=[];
        friendIds.map(f=>{
            prisma.user.findFirst({
                where:{
                    id:f
                }
            }).then(data=>{
                names.push(data?.displayName as string);
                return data?.displayName
            })
            console.log('names',names);
        })
        const msgs = conversation.map(c => {
            c.messages.some(m => m.senderId && m.content)
        })
        console.log(msgs);
        // const chats=await prisma.p
        res.json({
            conversation
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            msg: "error occured "
        })
    }

}