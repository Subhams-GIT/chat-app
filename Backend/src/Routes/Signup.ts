import e from 'express'
import Signup from '../Controller/Signup'
const router=e.Router()

export default router.post('/signin',Signup)