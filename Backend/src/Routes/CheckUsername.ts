import e from 'express'
import checkUsername from '../Controller/CheckUsername'
const router=e.Router()

export default router.post('/checkUsername',checkUsername)