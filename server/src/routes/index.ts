import { Router } from 'express'
import { reviewRouter } from './review'
import { userRouter } from './user'

const router = Router()

router.use('/user-management', userRouter)
router.use('/review-management', reviewRouter)

export default router
