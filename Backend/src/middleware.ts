import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import User from "./types/global";
dotenv.config();

const middleware = ( req: Request,res: Response,next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return new Error("unauthorised");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as User;

    req.session.user = req.session.user ?? decoded;
    next()

  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(403).json({ message: "Invalid token" });
  }
}

export default middleware