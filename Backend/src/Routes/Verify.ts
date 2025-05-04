import e from 'express'
import  verifyCodeHandler from '../Controller/Verify'
const router=e.Router()

export default router.get('/otp',verifyCodeHandler)