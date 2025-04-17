import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default async function middleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  if (!token) res.status(401).json({ message: "Unauthorized" });
  try {
    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (err: Error | null, decoded: any) => {
        if (err) res.status(403).json({ message: "Token invalid" });
        req.session.user = req.session.user ?? decoded;
        next();
      }
    );
    
  } catch (error) {
    console.log(error);
  }
}
