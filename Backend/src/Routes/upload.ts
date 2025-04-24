import e from 'express'
import { UploadImge } from '../Controller/uploadImage'
import multer from 'multer';
const router=e.Router()

export const upload = multer({ storage: multer.memoryStorage() });

export default router.post('/upload',upload.single('image'),UploadImge)