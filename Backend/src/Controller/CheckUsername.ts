import express, { Request, Response } from "express";
import { DbConnect } from "../db";
import prisma from "../db";

export default async function checkUsername(req:Request,res:Response){
    await DbConnect();
const user=await prisma.user.findFirst({
    where:{
        displayName:req.body.username
    }
})

if(user)
{
    res.json({
        success:false,
        message:"username is already present"
    })
}
}