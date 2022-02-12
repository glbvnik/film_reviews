export const enum RolesEnum {
    ADMIN = 'ADMIN',
    EDITOR = 'EDITOR',
    MODERATOR = 'MODERATOR',
    USER = 'USER',
    WRITER = 'WRITER',
}

export interface IUser {
    uuId: string
    email: string
    firstName: string
    lastName: string
    roles: RolesEnum[]
    isCommentsAllowed: boolean
}

export interface IRole {
    id: number
    name: RolesEnum
}

export interface IUserAdministration {
    uuId: string
    email: string
    isCommentsAllowed: boolean
    roles?: IRole[]
}

export interface IAllowCommentsData {
    uuId: string
    isCommentsAllowed: boolean
}

export interface IUserRoleInputs {
    uuId: string
    roleId: number
}

export interface IChangePasswordInputs {
    oldPassword: string
    password: string
}
