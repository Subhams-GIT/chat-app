import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyCodeHandler = async (req: Request, res: Response) => {
  try {
    const { id, code } = req.body as { id: number; code: number };

    // 1) Find the user
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2) Check the code
    if (user.verifyCode !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }

    // 3) Mark verified
    await prisma.user.update({
      where: { id },
      data: { verified: true },
    });

    // 4) Send success
    return res.status(200).json({
      success: true,
      message: "User verified successfully",
    });
  } catch (error: any) {
    console.error("Verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
