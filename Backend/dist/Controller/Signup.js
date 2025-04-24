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
const db_1 = require("../db");
const db_2 = __importDefault(require("../db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = __importDefault(require("zod"));
require("dotenv/config");
const resend_1 = require("resend");
const Usernames_json_1 = __importDefault(require("../Usernames.json"));
const resend = new resend_1.Resend(process.env.RESEND_KEY);
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.DbConnect)();
    const { username, password, email } = req.body;
    const signUpScehma = zod_1.default.object({
        username: zod_1.default.string().max(20).min(4),
        email: zod_1.default.string().email(),
        password: zod_1.default
            .string()
            .min(8),
    });
    const status = signUpScehma.safeParse(req.body);
    console.log(status);
    if (!status.success) {
        res.status(400).json({
            success: false,
            message: "please enter valid details",
        });
        return;
    }
    const user = yield db_2.default.user.findUnique({
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
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        try {
            const code = Math.floor(Math.random() * 999999);
            yield db_2.default.user.create({
                data: {
                    displayName: username,
                    email,
                    password: hashedPassword,
                    verifyCode: code,
                },
            });
            const idx = Usernames_json_1.default.usernames.findIndex((u) => u === username);
            if (idx !== -1) {
                // Remove exactly that one element
                Usernames_json_1.default.usernames.splice(idx, 1);
            }
            const { data, error } = yield resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: ["subhamkumardas4444@gmail.com"],
                subject: "Here is your code for verification ",
                html: `Code :${code}`,
            });
            if (error) {
                res.status(400).json({ error });
            }
        }
        catch (error) {
            console.log("error", error);
            return;
        }
        res.status(200).json({
            success: true,
            message: "account created",
        });
    }
    return;
});
