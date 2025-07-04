import { Request, Response } from "express";
import { DbConnect } from "../db";
import prisma from "../db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);
export default async function ForgotPassword(
  req: Request,
  res: Response
): Promise<void> {
  await DbConnect();

  const { email} = req.body;
  const code = Math.floor(Math.random() * 999999);
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["subhamkumardas4444@gmail.com"],
    subject: "Enter the code for passoword change",
    html: `Code :${code}`,
  });

  if(data){
    prisma.user.update({
      where: {
        email
      },
      data: {
        verifyCode: code
      }
    }).then(result=>{
      res.status(200).json({
        msg:"code updated"
      })
    }).catch(e=>{
      res.json({msg:"some error occured! please try again some later time!"})
    })
    
  }
  // const PasswordScehma = z.object({
  //   password: z
  //     .string()
  //     .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  //     .min(8),
  // });

  // if (!PasswordScehma.safeParse(password).success) {
  //   res.status(400).json('choose a  suitable password');
  // }
   
}