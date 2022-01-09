const enum RolesEnum {
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
}
