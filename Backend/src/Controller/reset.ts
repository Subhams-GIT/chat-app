import { Request, Response } from "express";
import { DbConnect } from "../db";
import prisma from "../db";
import bcrypt from 'bcryptjs'
import z from 'zod';
async function reset(req: Request,
	res: Response) {

	await DbConnect();
	const { email, password } = req.body;
	const PasswordScehma = z.object({
		password: z
			.string()
			.regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
			.min(8),
	});

	if (!PasswordScehma.safeParse(password).success) {
		res.status(400).json('choose a  suitable password');
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const response = await prisma.user.update({
		where: {
			email
		},
		data: {
			password: hashedPassword
		}
	})
	if (response) {
		res.json({
			success: true,
			message: "password changed ",
		})
	}
}