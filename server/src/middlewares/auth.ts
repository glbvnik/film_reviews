import { NextFunction, Request, Response } from 'express'
import { UserDto } from '../dtos/user'
import ApiError from '../errors/api'
import { RoleService } from '../services/role'
import { TokenService } from '../services/token'
import { RolesEnum } from '../types/role'

declare global {
    namespace Express {
        interface Request {
            userUuId?: string
        }
    }
}

export const authMiddleware =
    (roles: RolesEnum[]) =>
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
                if (
                    !(await RoleService.compareUserRoles(userData.uuId, roles))
                ) {
                    return next(ApiError.forbidden())
                }
            }

            req.userUuId = userData.uuId

            next()
        } catch (e) {
            return next(ApiError.unauthorized())
        }
    }
