import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { SxProps } from '@mui/system'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, useEffect } from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import {
    authSelectors,
    clearAuthStateBooleans,
} from '../../../redux/reducers/auth'
import {
    login,
    register,
    resetErrors,
    resetPassword,
    setPasswordResetLink,
} from '../../../redux/reducers/auth/action-creators'
import FormButtons from './FormButtons'
import FormHeader from './FormHeader'
import FormInputs from './FormInputs'
import { styles } from './sx'

const Form: FC = () => {
    const user = useAppSelector(authSelectors.user)
    const validationErrors = useAppSelector(authSelectors.validationErrors)
    const loginError = useAppSelector(authSelectors.loginError)
    const isRegistered = useAppSelector(authSelectors.isRegistered)
    const isPasswordResetLinkSet = useAppSelector(
        authSelectors.isPasswordResetLinkSet
    )
    const isPasswordReset = useAppSelector(authSelectors.isPasswordReset)

    const dispatch = useAppDispatch()

    const router = useRouter()

    const isRegisterUrl =
        router.pathname === process.env.NEXT_PUBLIC_REGISTER_ROUTE
    const isLoginUrl = router.pathname === process.env.NEXT_PUBLIC_LOGIN_ROUTE
    const isForgetPasswordUrl =
        router.pathname === process.env.NEXT_PUBLIC_FORGOT_PASSWORD_ROUTE
    const isResetPasswordUrl =
        router.pathname === process.env.NEXT_PUBLIC_RESET_PASSWORD_ROUTE

    const { handleSubmit, handleChange, resetForm, values } = useFormik({
        initialValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        },
        onSubmit: (values) => {
            if (isRegisterUrl) {
                dispatch(register(values))
            } else if (isLoginUrl) {
                dispatch(
                    login({ email: values.email, password: values.password })
                )
            } else if (isForgetPasswordUrl) {
                dispatch(setPasswordResetLink(values.email))
            } else if (isResetPasswordUrl) {
                dispatch(
                    resetPassword({
                        passwordResetLink: router.query
                            .passwordResetLink as string,
                        password: values.password,
                    })
                )
            }
        },
    })

    const handleInputChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        handleChange(e)

        if (validationErrors || loginError) {
            dispatch(resetErrors())
        }
    }

    const renderFormContent = () => {
        if (isRegistered) {
            return (
                <Typography component="p" textAlign="center" mt={2}>
                    We have sent you an email with activation link. Please click
                    on the link to activate your account.
                </Typography>
            )
        } else if (isPasswordResetLinkSet) {
            return (
                <Typography component="p" textAlign="center" mt={2}>
                    We have sent you an email with password reset link. Please
                    click on the link to reset your password.
                </Typography>
            )
        } else if (isPasswordReset) {
            return (
                <>
                    <Typography component="p" textAlign="center" mt={2} mb={2}>
                        Your password has been successfully changed.
                    </Typography>
                    <Button
                        size="large"
                        onClick={() =>
                            router.push(process.env.NEXT_PUBLIC_LOGIN_ROUTE!)
                        }
                    >
                        Login
                    </Button>
                </>
            )
        } else {
            return (
                <Box
                    noValidate
                    component="form"
                    onSubmit={handleSubmit}
                    width="100%"
                    mt={1}
                >
                    <FormInputs
                        isRegisterUrl={isRegisterUrl}
                        isForgetPasswordUrl={isForgetPasswordUrl}
                        isResetPasswordUrl={isResetPasswordUrl}
                        {...values}
                        handleInputChange={handleInputChange}
                    />
                    <FormButtons
                        isRegisterUrl={isRegisterUrl}
                        isLoginUrl={isLoginUrl}
                        isForgetPasswordUrl={isForgetPasswordUrl}
                        isResetPasswordUrl={isResetPasswordUrl}
                    />
                </Box>
            )
        }
    }

    useEffect(() => {
        if (loginError) {
            dispatch(resetErrors())
        }

        return () => {
            dispatch(resetErrors())
            dispatch(clearAuthStateBooleans())
        }
    }, [])

    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user])

    useEffect(() => {
        if (loginError) {
            resetForm()
        }
    }, [loginError])

    return (
        <Grid container sx={{ height: '100%' }}>
            <Grid item xs={false} sm={4} md={7} sx={styles.backgroundImage} />
            <Grid
                item
                square
                component={Paper}
                elevation={10}
                display="flex"
                alignItems="center"
                justifyContent="center"
                xs={12}
                sm={8}
                md={5}
            >
                <Box sx={styles.formBox as SxProps}>
                    <FormHeader
                        isRegisterUrl={isRegisterUrl}
                        isLoginUrl={isLoginUrl}
                        isForgetPasswordUrl={isForgetPasswordUrl}
                        isResetPasswordUrl={isResetPasswordUrl}
                        isPasswordReset={isPasswordReset}
                    />
                    {renderFormContent()}
                </Box>
            </Grid>
        </Grid>
    )
}

export default Form
