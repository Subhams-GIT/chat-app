import express, { Request, Response } from "express";
import { DbConnect } from "../db";
import prisma from "../db";

type User= {

	id: number ,
	displayName: string,
	email: string,
	profileImage: string,
}
export default async function (req:Request,res:Response) {
	await DbConnect();
	const user=await prisma.user.findFirst(
		{
			where:{
				id:Number(req.session.user?.id)
			},
			select:{
				id:true,
				email:true,
				displayName:true
			}
		}
	)

	if(!user){
		res.json({
			success:false,
			msg:"use not found"
		})
	}
	res.json({
		user
	})
	return ;
}