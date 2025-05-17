import express, { Request, Response } from "express";
import { DbConnect } from "../db";
import prisma from "../db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();


export default async (req:Request, res:Response) :Promise<void>=> {
  await DbConnect();
  const { password, email } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.json({
      success: false,
      message: "create your account first",
    });
  }
  if(!user?.verified)
  {
    res.json({
        success: false,
        message: "verify yourself first",
      });
      return ;
  }
  if (user) {
    if (!(await bcrypt.compare(password, user.password))) {
      res.json({
        success: false,
        message: "wrong Password",
      });
      return 
    }
    
    jwt.sign(
      user ,
      process.env.SECRET_KEY as string,
      (error: Error | null, encoded: string | undefined) => {
        if (error) {
          console.error("Error:", error);
        } else {
          console.log('token',encoded)
          res
            .cookie("token", encoded, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200)
            .json({
              success: true,
              message: "Signed in successfully",
              user:user.verified&&user
            });
          
        }
        
      }
    );
    
    
  }
  return;
}
