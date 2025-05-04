"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const uploadImage_1 = require("../Controller/uploadImage");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
exports.upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
exports.default = router.post('/upload', exports.upload.single('image'), uploadImage_1.UploadImge);
