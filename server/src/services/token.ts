import { Response } from 'express'
import { decode, sign, verify } from 'jsonwebtoken'
import { UserDto } from '../dtos/user'
import { ITokens } from '../types/token'

export const TokenService = {
    generateTokens(payload: UserDto) {
        const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET!, {
            expiresIn: '15min',
        })

        const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET!, {
            expiresIn: '90d',
        })

        return {
            accessToken,
            refreshToken,
        }
    },
    setCookie(tokens: ITokens, res: Response) {
        const { accessToken, refreshToken } = tokens

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 15,
            domain: process.env.DOMAIN,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 90,
            domain: process.env.DOMAIN,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        })
    },
    deleteCookie(res: Response) {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
    },
    validateAccessToken(token: string) {
        return verify(token, process.env.JWT_ACCESS_SECRET!)
    },
    validateRefreshToken(token: string) {
        return verify(token, process.env.JWT_REFRESH_SECRET!)
    },
    getUuId(refreshToken: string) {
        const { uuId } = (decode(refreshToken) as { uuId: string }) || {}

        return uuId
    },
}
