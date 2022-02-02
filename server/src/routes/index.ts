import { Router } from 'express'
import { ratingRouter } from './rating'
import { reviewRouter } from './review'
import { userRouter } from './user'

const router = Router()

router.use('/user-management', userRouter)
router.use('/review-management', reviewRouter)
router.use('/rating-management', ratingRouter)

export default router
