"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Verify_1 = __importDefault(require("../Controller/Verify"));
const router = express_1.default.Router();
exports.default = router.get('/otp', Verify_1.default);
