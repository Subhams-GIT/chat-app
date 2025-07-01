import { Request, Response } from "express";
import prisma from "../db";

export default async (req: Request, res: Response) => {
    const userid = req.session.user?.id

    try {


        const conversations = await prisma.conversation.findMany({
            where: {
                participants: {
                    some: { userId: Number(userid) },
                },
            },
            include: {
                participants: {
                    include: {
                        user: true
                    }
                },
                messages: {
                    orderBy: { sentAt: 'desc' }
                }
            },

        });

        const chats = conversations.map(convo => {
            const friend = convo.participants.find(p => p.userId !== Number(userid))?.user;

            const messages = convo.messages.map(msg => {
                const sender = convo.participants.find(p => p.userId === msg.senderId)?.user;
                return {
                    content: msg.content,
                    sentAt: msg.sentAt,
                    senderId: msg.senderId,
                    senderName: sender?.displayName || 'Unknown',
                };
            });

            return {
                friend,
                messages,
            };
        })
        res.json({
            chats
        });


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            msg: "error occured "
        })
    }

}

