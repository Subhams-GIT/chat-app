"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GetSession_1 = __importDefault(require("../Controller/GetSession"));
const router = express_1.default.Router();
exports.default = router.get('/session', GetSession_1.default);
