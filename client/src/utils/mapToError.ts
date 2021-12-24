import {
    IValidationError,
    IValidationErrors,
} from './../models/validationError'

export const mapToError = (errors: IValidationError[]) => {
    const errorMap: IValidationErrors = {}

    errors.forEach(({ param, msg }) => {
        errorMap[param as keyof IValidationErrors] = msg
    })

    return errorMap
}
