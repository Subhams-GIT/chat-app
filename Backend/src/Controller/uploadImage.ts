// import upload from '../Routes/upload';
import { v2 as cloudinary } from 'cloudinary';
import prisma from '../db';
import { Request, Response } from 'express';



export async function UploadImge(req: Request, res: Response): Promise<void> {
  const user=req.session.user;
  const profileImage=req.file?.buffer;
 
  prisma?.user.update({
    where:{
      id:Number(user?.id)
    },
    data:{
      profileImage
    }
  }).then(d=>{
    res.status(200).json({
      success:true,
      msg:"image uploaded sucessfully",
    })
  }).catch(c=>{
    console.log(c);
    res.status(500).json({
      success:false,
      msg:"error occured",
    })
  })
} 
