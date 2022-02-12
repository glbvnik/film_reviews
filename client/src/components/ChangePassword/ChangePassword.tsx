import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { ChangeEvent, FC, useEffect } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { authSelectors, clearAuthStates } from '../../redux/reducers/auth'
import {
    changePassword,
    resetErrors,
} from '../../redux/reducers/auth/action-creators'
import ActionMessage from '../UI/ActionMessage'
import ButtonLoader from '../UI/ButtonLoader'

const ChangePassword: FC = () => {
    const validationErrors = useAppSelector(authSelectors.validationErrors)
    const isAuthLoading = useAppSelector(authSelectors.isAuthLoading)
    const isPasswordChanged = useAppSelector(authSelectors.isPasswordChanged)

    const dispatch = useAppDispatch()

    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            oldPassword: '',
            password: '',
        },
        onSubmit: (values) => {
            dispatch(changePassword(values))
        },
    })

    const handleInputChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        handleChange(e)

        if (validationErrors) {
            dispatch(resetErrors())
        }
    }

    useEffect(() => {
        return () => {
            dispatch(resetErrors())
            dispatch(clearAuthStates())
        }
    }, [])

    if (isPasswordChanged) {
        return (
            <ActionMessage message="Your password has been successfully changed!" />
        )
    }

    return (
        <Box
            noValidate
            component="form"
            onSubmit={handleSubmit}
            width="100%"
            maxWidth={600}
            px={1}
            mx="auto"
        >
            <TextField
                fullWidth
                required
                id="oldPassword"
                name="oldPassword"
                type="password"
                label="Old password"
                margin="normal"
                value={values.oldPassword}
                onChange={handleInputChange}
                error={!!validationErrors?.oldPassword}
                helperText={validationErrors?.oldPassword}
            />
            <TextField
                fullWidth
                required
                id="password"
                name="password"
                type="password"
                label="New password"
                autoComplete="current-password"
                margin="normal"
                value={values.password}
                onChange={handleInputChange}
                error={!!validationErrors?.password}
                helperText={validationErrors?.password}
            />
            <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                endIcon={isAuthLoading && <ButtonLoader />}
                sx={{ mt: 3, mb: 2 }}
            >
                Change
            </Button>
        </Box>
    )
}

export default ChangePassword
