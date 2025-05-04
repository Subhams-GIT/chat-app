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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.DbConnect)();
    const { password, email } = req.body;
    const user = yield db_2.default.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!user) {
        res.json({
            success: false,
            message: "create your account first",
        });
    }
    if (!(user === null || user === void 0 ? void 0 : user.verified)) {
        res.json({
            success: false,
            message: "verify yourself first",
        });
        return;
    }
    if (user) {
        if (!(yield bcryptjs_1.default.compare(password, user.password))) {
            res.json({
                success: false,
                message: "wrong Password",
            });
            return;
        }
        jsonwebtoken_1.default.sign(user, process.env.SECRET_KEY, (error, encoded) => {
            if (error) {
                console.error("Error:", error);
            }
            else {
                console.log('token', encoded);
                res
                    .cookie("token", encoded, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                })
                    .status(200)
                    .json({
                    success: true,
                    message: "Signed in successfully",
                    user: user.verified && user
                });
            }
        });
    }
    return;
});
