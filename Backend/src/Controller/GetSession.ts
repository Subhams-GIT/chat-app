import express, { Request, Response } from "express";
import { DbConnect } from "../db";
import prisma from "../db";

type User= {
	id: number ,
	displayName: string|null,
	email: string,
	profileImage: string|null,
}
export default async function (req:Request,res:Response) {
	await DbConnect();
	const user: User | null = await prisma.user.findFirst(
		{
			where:{
				id:Number(req.session.user?.id)
			},
			select:{
				id:true,
				email:true,
				displayName:true,
				profileImage:true
			}
		}
	)

	if(!user){
		res.json({
			success:false,
			msg:"use not found"
		})
	}
	console.log(user)
	res.json({
		user
	})
	return ;
}