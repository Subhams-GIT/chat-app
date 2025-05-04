"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const verifyCodeHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.body;
        const username = req.params.username;
        // 1) Find the user
        const user = yield prisma.user.findFirst({
            where: { displayName: username },
        });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        // 2) Check the code
        if ((user === null || user === void 0 ? void 0 : user.verifyCode) !== code) {
            res.status(400).json({
                success: false,
                message: "Invalid verification code",
            });
        }
        // 3) Mark verified
        yield prisma.user.updateMany({
            where: { displayName: username },
            data: { verified: true },
        });
        // 4) Send success
        res.status(200).json({
            success: true,
            message: "User verified successfully",
        });
    }
    catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.default = verifyCodeHandler;
