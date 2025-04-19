import e from 'express'
import AddUser from '../Controller/AddUser'
const router=e.Router()

export default router.post('/signin',AddUser)