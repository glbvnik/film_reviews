import { TextField } from '@mui/material'
import React, { ChangeEvent, FC } from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { authSelectors } from '../../../redux/reducers/auth'

interface FormInputsProps {
    isRegisterUrl: boolean
    isForgetPasswordUrl: boolean
    isResetPasswordUrl: boolean
    email: string
    password: string
    firstName: string
    lastName: string
    handleInputChange: (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void
}

const FormInputs: FC<FormInputsProps> = ({
    isRegisterUrl,
    isForgetPasswordUrl,
    isResetPasswordUrl,
    email,
    password,
    firstName,
    lastName,
    handleInputChange,
}) => {
    const validationErrors = useAppSelector(authSelectors.validationErrors)

    return (
        <>
            {!isResetPasswordUrl && (
                <TextField
                    autoFocus
                    fullWidth
                    required
                    id="email"
                    name="email"
                    label="Email"
                    autoComplete="email"
                    margin="normal"
                    value={email}
                    onChange={handleInputChange}
                    error={!!validationErrors?.email}
                    helperText={validationErrors?.email}
                />
            )}
            {!isForgetPasswordUrl && (
                <TextField
                    fullWidth
                    required
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    autoComplete="current-password"
                    margin="normal"
                    value={password}
                    onChange={handleInputChange}
                    error={!!validationErrors?.password}
                    helperText={validationErrors?.password}
                />
            )}
            {isRegisterUrl && (
                <>
                    <TextField
                        fullWidth
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        margin="normal"
                        value={firstName}
                        onChange={handleInputChange}
                        error={!!validationErrors?.firstName}
                        helperText={validationErrors?.firstName}
                    />
                    <TextField
                        fullWidth
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        margin="normal"
                        value={lastName}
                        onChange={handleInputChange}
                        error={!!validationErrors?.lastName}
                        helperText={validationErrors?.lastName}
                    />
                </>
            )}
        </>
    )
}

export default FormInputs
