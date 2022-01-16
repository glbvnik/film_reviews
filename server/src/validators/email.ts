import { User } from '../db/models/classes/user'

export const emailValidator =
    (isExisting: boolean = true) =>
        async (email: string) => {
            const candidate = await User.findOne({
                where: { email },
                attributes: ['isActivated'],
            })

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
