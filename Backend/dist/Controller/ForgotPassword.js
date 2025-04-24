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
exports.default = ForgotPassword;
const db_1 = require("../db");
const db_2 = __importDefault(require("../db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = __importDefault(require("zod"));
function ForgotPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.DbConnect)();
        const { email, password } = req.body;
        const PasswordScehma = zod_1.default.object({
            password: zod_1.default
                .string()
                .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
                .min(8),
        });
        if (!PasswordScehma.safeParse(password).success) {
            res.status(400).json('choose a  suitable password');
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const response = yield db_2.default.user.update({
            where: {
                email
            },
            data: {
                password: hashedPassword
            }
        });
        if (response) {
            res.json({
                success: true,
                message: "password changed ",
            });
        }
    });
}
