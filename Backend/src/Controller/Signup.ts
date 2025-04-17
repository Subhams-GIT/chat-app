import express from 'express'
import { DbConnect } from '../db'
import prisma from '../db'
import bcrypt from "bcryptjs";
const router=express.Router()

export default router.post("/signup",async (req,res)=>{
    await DbConnect()
    const {username,password,email}=req.body


    const user=await prisma.user.findUnique({
        where: {
          email: email,
        },
    })
    if (user) res.status(400).json({
        success: false,
        message: "username is already registered"
    })
    else{
        const hashedPassword = await bcrypt.hash(password, 10)
            try {
              await prisma.user.create({
                data:{
                    displayName:username,
                    email,
                    password:hashedPassword,
                }
            })  
            } catch (error) {
                console.log("error",error)
                return;
            }
			res.status(200).json({
                success:true,
                message:"account created"
            })
    }
    return 
})