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
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const db_2 = __importDefault(require("../db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = express_1.default.Router();
exports.default = router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.DbConnect)();
    const { username, password, email } = req.body;
    const user = yield db_2.default.user.findUnique({
        where: {
            email: email,
        },
    });
    if (user)
        res.status(400).json({
            success: false,
            message: "username is already registered"
        });
    else {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        try {
            yield db_2.default.user.create({
                data: {
                    displayName: username,
                    email,
                    password: hashedPassword,
                }
            });
        }
        catch (error) {
            console.log("error", error);
            return;
        }
        res.status(200).json({
            success: true,
            message: "account created"
        });
    }
    return;
}));
