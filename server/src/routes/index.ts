import { Router } from 'express'
import { reviewRouter } from './review'
import { userRouter } from './user'

const router = Router()

router.use('/users', userRouter)
router.use('/reviews', reviewRouter)

export default router
