import { compare } from 'bcrypt'
import { CustomValidator } from 'express-validator'
import { User } from '../db/models/classes/user'
import ApiError from '../errors/api'

export const passwordValidator: CustomValidator = async (
    password: string,
    { req }
) => {
    const user = await User.findOne({
        where: { uuId: req.params!.uuId },
        attributes: ['password'],
    })

    if (!user) {
        throw ApiError.badRequest('Invalid user')
    }

    const isPasswordSame = await compare(password, user.password)

    if (!isPasswordSame) {
        return Promise.reject('Incorrect password')
    }
}
