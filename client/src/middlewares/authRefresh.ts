import { NextRequest, NextResponse } from 'next/server'
import { parse, splitCookiesString } from 'set-cookie-parser'

export const authRefresh = async (req: NextRequest) => {
    const response = NextResponse.next()

    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken
    const userCookie = req.cookies.user

    if (!refreshToken || (accessToken && userCookie)) {
        return response
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user-management/refresh`,
        { headers: { Cookie: `refreshToken=${refreshToken}` } }
    )

    const user = await res.json()

    const cookies = parse(splitCookiesString(res.headers.get('set-cookie')!))

    cookies.forEach((cookie) => {
        if (cookie.name === 'accessToken' && 'uuId' in user) {
            response.cookie('user', JSON.stringify(user), {
                expires: cookie.expires,
            })
        }

        response.cookie(cookie.name, cookie.value, {
            expires: cookie.expires,
            httpOnly: cookie.httpOnly,
        })
    })

    return response
}
