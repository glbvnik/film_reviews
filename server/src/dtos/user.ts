import { IUser, UserRoles } from '../types/user'

export class UserDto {
    id: string
    email: string
    firstName: string
    lastName: string
    roles: UserRoles[]

    constructor(model: Omit<IUser, 'createdAt' | 'updatedAt'>) {
        this.id = model.id
        this.email = model.email
        this.firstName = model.firstName
        this.lastName = model.lastName
        this.roles = model.roles
    }
}
