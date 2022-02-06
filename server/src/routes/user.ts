import { Router } from 'express'
import { body } from 'express-validator'
import { UserController } from '../controllers/user'
import { authMiddleware } from '../middlewares/auth'
import { RolesEnum } from '../types/role'
import { emailValidator } from '../validators/email'

export const userRouter = Router()

userRouter.post(
    '/register',
    body('email').custom(emailValidator).isEmail().withMessage('Invalid email'),
    body('password')
        .isLength({ min: 8, max: 50 })
        .withMessage(
            'Password should contain at least 8 and at most 32 characters'
        ),
    body('firstName')
        .isLength({ min: 1, max: 50 })
        .withMessage(
            'First name should contain at least 1 and at most 32 characters'
        ),
    body('lastName')
        .isLength({ min: 1, max: 50 })
        .withMessage(
            'Last name should contain at least 1 and at most 32 characters'
        ),
    UserController.register
)
userRouter.post('/login', UserController.login)
userRouter.post('/logout', UserController.logout)
userRouter.get('/activate/:activationLink', UserController.activate)
userRouter.get('/refresh', UserController.refresh)
userRouter.patch(
    '/reset-password',
    body('email')
        .custom(emailValidator(false))
        .isEmail()
        .withMessage('Invalid email'),
    UserController.setPasswordResetLink
)
userRouter.patch(
    '/reset-password/:passwordResetLink',
    body('password')
        .isLength({ min: 8, max: 50 })
        .withMessage(
            'Password should contain at least 8 and at most 32 characters'
        ),
    UserController.resetPassword
)
userRouter.get(
    '/users',
    authMiddleware([RolesEnum.ADMIN, RolesEnum.MODERATOR]),
    UserController.getUsers
)
userRouter.patch(
    '/allow-comments/:uuId',
    authMiddleware([RolesEnum.ADMIN, RolesEnum.MODERATOR]),
    UserController.allowComments
)
