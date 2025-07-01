import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const  verifyCodeHandler = async (req: Request, res: Response) :Promise<void>=> {
  try {
    const {  code } = req.body as { code: number };
    const username=req.query.username as string
    console.log(username)
   
    const user = await prisma.user.findFirst({
      where: { displayName:username },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2) Check the code
    if (user?.verifyCode !== code) {
       res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }

    // 3) Mark verified
    await prisma.user.updateMany({
      where: { displayName:username},
      data: { verified: true },
    });

    // 4) Send success
    res.status(200).json({
      success: true,
      message: "User verified successfully",
    });
  } catch (error: any) {
    console.error("Verification error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default verifyCodeHandler