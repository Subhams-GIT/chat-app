"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadImge = UploadImge;
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
function UploadImge(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        const stream = cloudinary_1.v2.uploader.upload_stream({ folder: 'my-app-uploads' }, (error, result) => {
            if (error)
                return res.status(500).json({ error: error.message });
            return res.json({ public_id: result === null || result === void 0 ? void 0 : result.public_id, url: result === null || result === void 0 ? void 0 : result.secure_url });
        });
        streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
    }
    catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: 'Upload failed.' });
    }
}
