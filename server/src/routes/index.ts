import { Router } from 'express'
import { userRouter } from './user'

const router = Router()

router.use('/user-management', userRouter)

export default router
