import { ValidationError } from 'express-validator'

export default class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public errors?: ValidationError[]
    ) {
        super(message)
    }

    static badRequest(message: string, errors?: ValidationError[]) {
        return new ApiError(400, message, errors)
    }

    static unauthorized() {
        return new ApiError(401, 'Invalid authorization')
    }

    static forbidden() {
        return new ApiError(
            403,
            'You do not have permission to access this service'
        )
    }

    static conflict(message: string) {
        return new ApiError(409, message)
    }
}
