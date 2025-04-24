"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Signin_1 = __importDefault(require("../Controller/Signin"));
const router = express_1.default.Router();
exports.default = router.post('/signin', Signin_1.default);
