import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../errors/api'
import { TokenService } from '../services/token'
import { UserService } from '../services/user'

export const UserController = {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(
                    ApiError.badRequest('Validation error', errors.array())
                )
            }

            await UserService.register(req.body)

            return res.json({ message: 'Successfully registered' })
        } catch (e) {
            next(e)
        }
    },
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = await UserService.login(
                req.body,
                req.headers['user-agent']!
            )

            TokenService.setCookie(userData.tokens, res)

            return res.json(userData.user)
        } catch (e) {
            next(e)
        }
    },
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            await UserService.logout(req.cookies.refreshToken)

            TokenService.deleteCookie(res)

            return res.status(200).end()
        } catch (e) {
            next(e)
        }
    },
    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = await UserService.activate(
                req.params.activationLink,
                req.headers['user-agent']!
            )

            TokenService.setCookie(userData.tokens, res)

            return res.redirect(process.env.CLIENT_URL!)
        } catch (e) {
            next(e)
        }
    },
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = await UserService.refresh(req.cookies.refreshToken)

            TokenService.setCookie(userData.tokens, res)

            return res.json(userData.user)
        } catch (e) {
            next(e)
        }
    },
    async setPasswordResetLink(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(
                    ApiError.badRequest('Validation error', errors.array())
                )
            }

            await UserService.setPasswordResetLink(req.body.email)

            return res.json({ message: 'Password reset link was sent' })
        } catch (e) {
            next(e)
        }
    },
    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(
                    ApiError.badRequest('Validation error', errors.array())
                )
            }

            await UserService.resetPassword(
                req.params.passwordResetLink,
                req.body.password
            )

            return res.json({ message: 'Password successfully changed' })
        } catch (e) {
            next(e)
        }
    },
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getUsers()

            return res.json(users)
        } catch (e) {
            next(e)
        }
    },
    async allowComments(req: Request, res: Response, next: NextFunction) {
        try {
            await UserService.allowComments(
                req.params.uuId,
                req.body.isCommentsAllowed
            )

            res.json({ message: 'isCommentsAllowed was updated' })
        } catch (e) {
            next(e)
        }
    },
}
