import { RolesEnum } from '../types/role'
import { IUser } from '../types/user'

export class UserDto {
    uuId: string
    email: string
    firstName: string
    lastName: string
    roles: RolesEnum[]
    isCommentsAllowed: boolean

    constructor(
        model: Omit<IUser, 'createdAt' | 'updatedAt'>,
        roles: RolesEnum[]
    ) {
        this.uuId = model.uuId
        this.email = model.email
        this.firstName = model.firstName
        this.lastName = model.lastName
        this.roles = roles
        this.isCommentsAllowed = model.isCommentsAllowed
    }
}
