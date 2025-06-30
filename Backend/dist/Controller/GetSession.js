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
exports.default = default_1;
const db_1 = require("../db");
const db_2 = __importDefault(require("../db"));
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        yield (0, db_1.DbConnect)();
        const user = yield db_2.default.user.findFirst({
            where: {
                id: Number((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id)
            },
            select: {
                id: true,
                email: true,
                displayName: true,
                profileImage: true
            }
        });
        if (!user) {
            res.json({
                success: false,
                msg: "use not found"
            });
        }
        console.log(user);
        res.json({
            user
        });
        return;
    });
}
