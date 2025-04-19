import e from 'express'
import SignIn from '../Controller/Signin'
const router=e.Router()

export default router.post('/signin',SignIn)