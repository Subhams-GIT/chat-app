"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CheckUsername_1 = __importDefault(require("../Controller/CheckUsername"));
const router = express_1.default.Router();
exports.default = router.post('/checkUsername', CheckUsername_1.default);
