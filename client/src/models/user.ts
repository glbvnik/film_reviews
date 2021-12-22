const enum UserRoles {
    ADMIN = 'ADMIN',
    EDITOR = 'EDITOR',
    MODERATOR = 'MODERATOR',
    USER = 'USER',
    WRITER = 'WRITER',
}

export interface IUser {
    id: string
    email: string
    firstName: string
    role: UserRoles[]
}
