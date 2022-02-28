import { compare, hash } from 'bcrypt'
import { v4 } from 'uuid'
import { Role } from '../db/models/classes/role'
import { Token } from '../db/models/classes/token'
import { User } from '../db/models/classes/user'
import { UserRole } from '../db/models/classes/userRole'
import { UserDto } from '../dtos/user'
import ApiError from '../errors/api'
import { RolesEnum } from '../types/role'
import { IUserInput } from '../types/user'
import { validateUUID } from '../utils/validateUUID'
import { MailService } from './mail'
import { TokenService } from './token'

export const UserService = {
    async register(inputs: IUserInput) {
        const { email, password, firstName, lastName } = inputs

        const activationLink = v4()

        const user = {
            email,
            password: await hash(password, 12),
            firstName,
            lastName,
            activationLink,
        }

        const candidate = await User.findOne({
            where: { email },
            attributes: ['uuId'],
        })

        if (candidate) {
            await candidate.update(user)
        } else {
            await User.create(user)
        }

        await MailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/users/activate/${activationLink}`
        )
    },
    async login(
        inputs: Omit<IUserInput, 'firstName' | 'lastName'>,
        agent: string
    ) {
        const { email, password } = inputs

        const user = await User.findOne({
            where: { email },
            attributes: [
                'uuId',
                'email',
                'password',
                'firstName',
                'lastName',
                'isActivated',
                'isCommentsAllowed',
            ],
            include: [
                {
                    model: Role,
                    as: 'roles',
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                },
            ],
        })

        if (!user || !user.isActivated) {
            throw ApiError.badRequest('Incorrect email or password')
        }

        const isPassEquals = await compare(password, user.password)

        if (!isPassEquals) {
            throw ApiError.badRequest('Incorrect email or password')
        }

        const userDto = new UserDto(user)

        const tokens = TokenService.generateTokens({ ...userDto })

        const tokenFromDb = await Token.findOne({ where: { agent } })

        if (tokenFromDb) {
            await Token.update(
                { refreshToken: tokens.refreshToken },
                { where: { userUuId: userDto.uuId, agent } }
            )
        } else {
            await Token.create({
                agent,
                refreshToken: tokens.refreshToken,
                userUuId: userDto.uuId,
            })
        }

        return {
            tokens,
            user: userDto,
        }
    },
    async logout(refreshToken: string) {
        await Token.destroy({ where: { refreshToken } })
    },
    async activate(activationLink: string, agent: string) {
        if (!validateUUID(activationLink)) {
            throw ApiError.badRequest('Invalid activation link')
        }

        const user = await User.findOne({
            where: { activationLink },
            attributes: [
                'uuId',
                'email',
                'firstName',
                'lastName',
                'isActivated',
                'isCommentsAllowed',
            ],
        })

        if (!user) {
            throw ApiError.badRequest('Invalid activation link')
        }

        if (!user.isActivated) {
            const userRoleId = await Role.findOne({
                where: { name: RolesEnum.USER },
                attributes: ['id'],
            })

            await UserRole.create({
                userUuId: user.uuId,
                roleId: userRoleId!.id,
            })
        }

        const userDto = new UserDto(user)

        const tokens = TokenService.generateTokens({ ...userDto })

        await Token.upsert({
            agent,
            refreshToken: tokens.refreshToken,
            userUuId: user.uuId,
        })

        user.isActivated = true

        await user.save()

        return { tokens }
    },
    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.badRequest('No refresh token')
        }

        const userData = TokenService.validateRefreshToken(
            refreshToken
        ) as UserDto

        const tokenFromDb = await Token.findOne({ where: { refreshToken } })

        if (!userData || !tokenFromDb) {
            throw ApiError.badRequest('Invalid refresh token')
        }

        const user = await User.findOne({
            where: { uuId: userData.uuId },
            attributes: [
                'uuId',
                'email',
                'firstName',
                'lastName',
                'isActivated',
                'isCommentsAllowed',
            ],
            include: [
                {
                    model: Role,
                    as: 'roles',
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                },
            ],
        })

        const userDto = new UserDto(user!)

        const tokens = TokenService.generateTokens({ ...userDto })

        await tokenFromDb.update({ refreshToken: tokens.refreshToken })

        return {
            tokens,
            user: userDto,
        }
    },
    async setPasswordResetLink(email: string) {
        const passwordResetLink = v4()

        await User.update({ passwordResetLink }, { where: { email } })

        await MailService.sendPasswordResetLink(
            email,
            `${process.env.CLIENT_URL}/forgot-password/${passwordResetLink}`
        )
    },
    async resetPassword(passwordResetLink: string, password: string) {
        if (!validateUUID(passwordResetLink)) {
            throw ApiError.badRequest('Invalid password reset link')
        }

        const user = await User.update(
            { password: await hash(password, 12), passwordResetLink: null },
            {
                where: { passwordResetLink },
            }
        )

        if (!user[0]) {
            throw ApiError.badRequest('Invalid password reset link')
        }
    },
    async changePassword(uuId: string, password: string) {
        const user = await User.update(
            { password: await hash(password, 12) },
            {
                where: { uuId },
            }
        )

        if (!user[0]) {
            throw ApiError.badRequest('Invalid user')
        }
    },
    async getUsers(isWithRoles: number) {
        if (isWithRoles) {
            const users = await User.findAll({
                attributes: ['uuId', 'email', 'isCommentsAllowed'],
                include: [
                    {
                        model: Role,
                        as: 'roles',
                        attributes: ['id', 'name'],
                        through: {
                            attributes: [],
                        },
                    },
                ],
            })

            const roles = await Role.findAll({ attributes: ['id', 'name'] })

            return { users, roles }
        } else {
            return await User.findAll({
                attributes: ['uuId', 'email', 'isCommentsAllowed'],
            })
        }
    },
    async allowComments(uuId: string, isCommentsAllowed: boolean) {
        const user = await User.update(
            { isCommentsAllowed },
            { where: { uuId } }
        )

        if (!user[0]) {
            throw ApiError.badRequest('Invalid user uuId')
        }
    },
}
