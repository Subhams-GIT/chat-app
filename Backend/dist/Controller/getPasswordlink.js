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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_KEY);
function getPasswordLink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, code } = req.body;
        const code = Math.floor(Math.random() * 999999);
        const { data, error } = yield resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["subhamkumardas4444@gmail.com"],
            subject: "Enter the code for passoword change",
            html: `Code :${code}`,
        });
        if (data) {
            try {
                const updates = yield db_1.default.user.update({
                    where: {
                        email
                    },
                    data: {
                        verifyCode: code
                    }
                });
                if (updates) {
                    if (updates.verifyCode === code) {
                        res.status(200).json({
                            success: true,
                            msg: "verification email send sucessfully"
                        });
                    }
                }
            }
            finally {
            }
        }
    });
}
