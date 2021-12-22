import { NextFunction, Request, Response } from 'express'
import { User } from '../db/models/classes/user'
import ApiError from '../errors/api'
import { TokenService } from '../services/token'
import { UserRoles } from '../types/user'
import { UserDto } from './../dtos/user'

export const authMiddleware =
    (role: UserRoles) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { accessToken } = req.cookies as { accessToken: string }

                if (!accessToken) {
                    return next(ApiError.unauthorized())
                }

                const userData = TokenService.validateAccessToken(accessToken) as UserDto

                if (!userData) {
                    return next(ApiError.unauthorized())
                }

                if (role) {
                    const user = await User.findOne({
                        where: { id: userData.id },
                        attributes: ['role'],
                    })

                    if (user!.role.includes(role)) {
                        return next(ApiError.forbidden())
                    }
                }

                next()
            } catch (e) {
                return next(ApiError.unauthorized())
            }
        }
