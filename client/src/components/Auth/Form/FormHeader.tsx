import EmailIcon from '@mui/icons-material/Email'
import HelpIcon from '@mui/icons-material/Help'
import LoginIcon from '@mui/icons-material/Login'
import PasswordIcon from '@mui/icons-material/Password'
import { Alert, Avatar, CircularProgress, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { selectApp } from '../../../redux/reducers/app'
import { selectAuth } from '../../../redux/reducers/auth'
import { styles } from './sx'

interface FormHeaderProps {
    isRegisterUrl: boolean
    isLoginUrl: boolean
    isForgetPasswordUrl: boolean
    isResetPasswordUrl: boolean
    isPasswordReset: boolean
}

const FormHeader: FC<FormHeaderProps> = ({
    isRegisterUrl,
    isLoginUrl,
    isForgetPasswordUrl,
    isResetPasswordUrl,
    isPasswordReset,
}) => {
    const { loginError, isRegistered, isPasswordResetLinkSet } =
        useAppSelector(selectAuth)
    const { isLoading } = useAppSelector(selectApp)

    const renderIcon = () => {
        if (isLoading) {
            return <CircularProgress />
        } else if (isRegistered) {
            return <EmailIcon />
        } else if (isLoginUrl) {
            return <LoginIcon />
        } else if (isForgetPasswordUrl) {
            return <HelpIcon />
        } else if (isResetPasswordUrl) {
            return <PasswordIcon />
        }
    }

    const renderTypography = () => {
        if (isRegistered || isPasswordResetLinkSet) {
            return 'Please check your email!'
        } else if (isPasswordReset) {
            return 'Success!'
        } else if (isRegisterUrl) {
            return 'Register'
        } else if (isLoginUrl) {
            return 'Login'
        } else if (isForgetPasswordUrl) {
            return 'Type in your email to reset password'
        } else if (isResetPasswordUrl) {
            return 'Type in your new password'
        }
    }

    return (
        <>
            <Avatar sx={{ bgcolor: 'secondary.main', m: 1 }}>
                {renderIcon()}
            </Avatar>
            <Typography component="h2" variant="h5" textAlign="center">
                {renderTypography()}
            </Typography>
            {loginError && (
                <Alert severity="error" sx={styles.alert}>
                    {loginError}
                </Alert>
            )}
        </>
    )
}

export default FormHeader
