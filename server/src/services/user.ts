import { compare, hash } from 'bcrypt'
import { v4 } from 'uuid'
import { Token } from '../db/models/classes/token'
import { User } from '../db/models/classes/user'
import ApiError from '../errors/api'
import { IUserInput, UserRoles } from '../types/user'
import { validateUUID } from '../utils/validateUUID'
import { UserDto } from './../dtos/user'
import { MailService } from './mail'
import { TokenService } from './token'

export const UserService = {
    async register(inputs: IUserInput) {
        const { email, password, firstName, lastName } = inputs

        const hashPassword = await hash(password, 12)

        const userId = v4()

        const activationLink = v4()

        const user = {
            id: userId,
            email,
            password: hashPassword,
            firstName,
            lastName,
            role: [UserRoles.USER],
            isActivated: false,
            activationLink: activationLink,
        }

        const candidate = await User.findOne({
            where: { email },
            attributes: ['id'],
        })

        if (candidate) {
            candidate.set(user)

            await candidate.save()
        } else {
            await User.create(user)
        }

        await MailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/user-management/activate/${activationLink}`
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
                'id',
                'email',
                'password',
                'firstName',
                'lastName',
                'role',
                'isActivated',
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
                { where: { userId: userDto.id, agent } }
            )
        } else {
            await Token.create({
                agent,
                refreshToken: tokens.refreshToken,
                userId: userDto.id,
            })
        }

        return {
            tokens,
            user: userDto,
        }
    },
    async logout(refreshToken: string) {
        Token.destroy({ where: { refreshToken } })
    },
    async activate(activationLink: string, agent: string) {
        if (!validateUUID(activationLink)) {
            throw ApiError.badRequest('Invalid activation link')
        }

        const user = await User.findOne({ where: { activationLink } })

        if (!user) {
            throw ApiError.badRequest('Invalid activation link')
        }

        user.isActivated = true

        const userDto = new UserDto(user)

        const tokens = TokenService.generateTokens({ ...userDto })

        try {
            await Token.create({
                agent,
                refreshToken: tokens.refreshToken,
                userId: user.id,
            })
        } catch (e) {
            await User.destroy({ where: { id: user.id } })
        }

        await user!.save()

        return { tokens }
    },
    async refresh(refreshToken: string, agent: string) {
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
            where: { id: userData.id },
            attributes: [
                'id',
                'email',
                'password',
                'firstName',
                'lastName',
                'role',
            ],
        })

        const userDto = new UserDto(user!)

        const tokens = TokenService.generateTokens({ ...userDto })

        await Token.update(
            { refreshToken: tokens.refreshToken },
            { where: { userId: userDto.id, agent } }
        )

        return {
            tokens,
            user: userDto,
        }
    },
    async getUsers() {
        const users = await User.findAll()

        return users
    },
}
