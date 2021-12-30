import { NextFunction, Request, Response } from 'express'
import { User } from '../db/models/classes/user'
import ApiError from '../errors/api'
import { TokenService } from '../services/token'
import { UserRoles } from '../types/user'
import { UserDto } from './../dtos/user'

declare global {
    namespace Express {
        interface Request {
            userId?: string
        }
    }
}

export const authMiddleware =
    (roles: UserRoles[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { accessToken } = req.cookies as { accessToken: string }

            if (!accessToken) {
                return next(ApiError.unauthorized())
            }

            const userData = TokenService.validateAccessToken(
                accessToken
            ) as UserDto

            if (!userData) {
                return next(ApiError.unauthorized())
            }

            if (roles) {
                const user = await User.findOne({
                    where: { id: userData.id },
                    attributes: ['roles'],
                })

                let isAllowed = false

                roles.forEach((role) => {
                    if (user!.roles.includes(role)) {
                        isAllowed = true
                    }
                })

                if (!isAllowed) {
                    return next(ApiError.forbidden())
                }
            }

            req.userId = userData.id

            next()
        } catch (e) {
            return next(ApiError.unauthorized())
        }
    }
