export enum RolesEnum {
    ADMIN = 'ADMIN',
    EDITOR = 'EDITOR',
    MODERATOR = 'MODERATOR',
    USER = 'USER',
    WRITER = 'WRITER',
}

export interface IRole {
    id: number
    name: RolesEnum
    createdAt: Date
    updatedAt: Date
}
