import e from 'express'
import GETSession from '../Controller/GetSession'
const router=e.Router()

export default router.get('/session',GETSession)