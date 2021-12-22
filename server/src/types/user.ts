export enum UserRoles {
    ADMIN = 'ADMIN',
    EDITOR = 'EDITOR',
    MODERATOR = 'MODERATOR',
    USER = 'USER',
    WRITER = 'WRITER',
}

export interface IUser {
    id: string
    email: string
    password: string
    firstName: string
    lastName: string
    role: UserRoles[]
    isActivated: boolean
    activationLink: string
    createdAt: Date
    updatedAt: Date
}

export interface IUserInput {
    email: string
    password: string
    firstName: string
    lastName: string
}
