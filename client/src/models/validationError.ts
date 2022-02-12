export interface IValidationError {
    location: string
    msg: string
    param: string
    value: string
}

export interface IValidationErrors {
    email?: string
    password?: string
    firstName?: string
    lastName?: string
    oldPassword?: string
}
