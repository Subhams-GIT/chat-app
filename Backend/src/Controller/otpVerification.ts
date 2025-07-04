import { Request, Response } from "express";

export function OtpVerified(req:Request,res:Response){
	const {email,otp}=req.body;

	prisma?.user.findFirst({
		where:{
			email
		}
	}).then(data=>{
		if(data?.verifyCode===otp)
		{
			res.json({
				success:true,
			})
		}
		else{
			res.json({
				success:false,
				msg:"please enter correct otp"
			})
		}
	}).catch(e=>{
		res.json({
			success:false,
			msg:"error occured try again after some time"
		})
	})
}