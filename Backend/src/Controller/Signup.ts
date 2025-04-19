import express, { Request, Response } from "express";
import { DbConnect } from "../db";
import prisma from "../db";
import bcrypt from "bcryptjs";
import z from "zod";
import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);
export default async (req: Request, res: Response): Promise<void> => {
  await DbConnect();
  const { username, password, email } = req.body;
  const signUpScehma = z.object({
    username: z.string().max(8).min(4),
    email: z.string().email(),
    password: z
      .string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .min(8),
  });
  const status = signUpScehma.safeParse(req.body);
  if (!status.success) {
    res.status(400).json({
      success: false,
      message: "please enter valid details",
    });
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user)
    res.status(400).json({
      success: false,
      message: "username is already registered",
    });
  else {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const code = Math.floor(Math.random() * 999999);
      await prisma.user.create({
        data: {
          displayName: username,
          email,
          password: hashedPassword,
          verifyCode: code,
        },
      });

      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["subhamkumardas4444@gmail.com"],
        subject: "Here is your code for verification ",
        html: `Code :${code}`,
      });

      if (error) {
        res.status(400).json({ error });
      }
    } catch (error) {
      console.log("error", error);
      return;
    }
    res.status(200).json({
      success: true,
      message: "account created",
    });
  }
  return;
};
