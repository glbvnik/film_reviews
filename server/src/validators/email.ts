import { Meta } from 'express-validator'
import { User } from '../db/models/classes/user'

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export const emailValidator =
    (isExisting: boolean = true) =>
    async (email: string, { req }: Meta) => {
        const candidate = await User.findOne({
            where: { email },
            attributes: ['uuId', 'isActivated'],
        })

        req.user = candidate

        if (isExisting) {
            if (candidate?.isActivated) {
                return Promise.reject('This email is already taken')
            }
        } else {
            if (!candidate?.isActivated) {
                return Promise.reject(
                    'No account with this email has been found'
                )
            }
        }
    }
