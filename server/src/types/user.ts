export interface IUser {
    uuId: string
    email: string
    password: string
    firstName: string
    lastName: string
    isActivated: boolean
    activationLink: string
    passwordResetLink: string | null
    isCommentsAllowed: boolean
    createdAt: Date
    updatedAt: Date
}

export interface IUserRole {
    userUuId: string
    roleId: number
    createdAt: Date
    updatedAt: Date
}

export interface IUserInput {
    email: string
    password: string
    firstName: string
    lastName: string
}
