import { User } from '../db/models/classes/user'

export const emailValidator = async (email: string) => {
    const candidate = await User.findOne({
        where: { email },
        attributes: ['isActivated'],
    })

    if (candidate?.isActivated) {
        return Promise.reject('This email is already taken')
    }
}
