import { IRole, RolesEnum } from '../types/role'
import { IUser } from '../types/user'

export class UserDto {
    uuId: string
    email: string
    firstName: string
    lastName: string
    roles: RolesEnum[]
    isCommentsAllowed: boolean

    constructor(
        model: Omit<IUser, 'createdAt' | 'updatedAt'> & { roles?: IRole[] }
    ) {
        this.uuId = model.uuId
        this.email = model.email
        this.firstName = model.firstName
        this.lastName = model.lastName
        this.roles = model.roles
            ? model.roles.map(({ name }) => name)
            : [RolesEnum.USER]
        this.isCommentsAllowed = model.isCommentsAllowed
    }
}
