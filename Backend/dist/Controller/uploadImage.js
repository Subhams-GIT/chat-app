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
exports.UploadImge = UploadImge;
const db_1 = __importDefault(require("../db"));
function UploadImge(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const user = req.session.user;
        const profileImage = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
        db_1.default === null || db_1.default === void 0 ? void 0 : db_1.default.user.update({
            where: {
                id: Number(user === null || user === void 0 ? void 0 : user.id)
            },
            data: {
                profileImage
            }
        }).then(d => {
            res.status(200).json({
                success: true,
                msg: "image uploaded sucessfully",
            });
        }).catch(c => {
            console.log(c);
            res.status(500).json({
                success: false,
                msg: "error occured",
            });
        });
    });
}
