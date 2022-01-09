export interface IUser {
    uuId: string
    email: string
    password: string
    firstName: string
    lastName: string
    isActivated?: boolean
    activationLink: string
    createdAt: Date
    updatedAt: Date
}

export interface IUserRole {
    UserUuId: string
    RoleId: number
    createdAt: Date
    updatedAt: Date
}

export interface IUserInput {
    email: string
    password: string
    firstName: string
    lastName: string
}
