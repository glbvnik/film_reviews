import EmailIcon from '@mui/icons-material/Email'
import LoginIcon from '@mui/icons-material/Login'
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Grid,
    Link as MuiLink,
    Paper,
    TextField,
    Typography,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { SxProps } from '@mui/system'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, useEffect } from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { selectApp } from '../../../redux/reducers/app'
import { selectAuth } from '../../../redux/reducers/auth'
import { login, register, resetErrors } from '../../../redux/reducers/auth/action-creators'
import { theme } from '../../../theme'
import { styles } from './sx'

const Form: FC = () => {
    const { user, validationErrors, loginError, isRegistered } = useAppSelector(selectAuth)
    const { isLoading } = useAppSelector(selectApp)

    const dispatch = useAppDispatch()

    const router = useRouter()

    const url = router.pathname

    const isSm = useMediaQuery(theme.breakpoints.up('sm'))

    const isRegister = url === '/register'

    const { handleSubmit, handleChange, resetForm, values } = useFormik({
        initialValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        },
        onSubmit: (values) => {
            if (isRegister) {
                dispatch(register(values))
            } else {
                dispatch(login({ email: values.email, password: values.password }))
            }
        },
    })

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        handleChange(e)

        if (validationErrors || loginError) {
            dispatch(resetErrors())
        }
    }

    const renderIcon = () => {
        if (isLoading) {
            return <CircularProgress />
        } else if (isRegistered) {
            return <EmailIcon />
        }

        return <LoginIcon />
    }

    const renderTypography = () => {
        if (isRegistered) {
            return 'Please check your email!'
        } else if (isRegister) {
            return 'Register'
        }

        return 'Login'
    }

    useEffect(() => {
        if (loginError) {
            dispatch(resetErrors())
        }

        return () => {
            dispatch(resetErrors())
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
                display='flex'
                alignItems='center'
                justifyContent='center'
                xs={12}
                sm={8}
                md={5}
            >
                <Box sx={styles.formBox as SxProps}>
                    <Avatar sx={{ bgcolor: 'secondary.main', m: 1 }}>
                        {renderIcon()}
                    </Avatar>
                    <Typography component='h2' variant='h5' textAlign='center'>
                        {renderTypography()}
                    </Typography>
                    {loginError && <Alert severity='error' sx={styles.alert}>{loginError}</Alert>}
                    {isRegistered ?
                        <Typography component='p' textAlign='center' mt={2}>
                            We have sent you an email with activation link. Please click on the link to activate your
                            account.
                        </Typography>
                        :
                        <Box
                            noValidate
                            component='form'
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                autoFocus
                                fullWidth
                                required
                                id='email'
                                name='email'
                                label='Email'
                                autoComplete='email'
                                margin='normal'
                                value={values.email}
                                onChange={handleInputChange}
                                error={!!validationErrors?.email}
                                helperText={validationErrors?.email}
                            />
                            <TextField
                                fullWidth
                                required
                                id='password'
                                name='password'
                                type='password'
                                label='Password'
                                autoComplete='current-password'
                                margin='normal'
                                value={values.password}
                                onChange={handleInputChange}
                                error={!!validationErrors?.password}
                                helperText={validationErrors?.password}
                            />
                            {isRegister && (
                                <>
                                    <TextField
                                        fullWidth
                                        required
                                        id='firstName'
                                        name='firstName'
                                        label='First name'
                                        margin='normal'
                                        value={values.firstName}
                                        onChange={handleInputChange}
                                        error={!!validationErrors?.firstName}
                                        helperText={validationErrors?.firstName}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        id='lastName'
                                        name='lastName'
                                        label='Last name'
                                        margin='normal'
                                        value={values.lastName}
                                        onChange={handleInputChange}
                                        error={!!validationErrors?.lastName}
                                        helperText={validationErrors?.lastName}
                                    />
                                </>
                            )}
                            <Button
                                fullWidth
                                size='large'
                                type='submit'
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {isRegister ? 'Register' : 'Login'}
                            </Button>
                            <Grid container justifyContent='center'>
                                <Grid
                                    item
                                    xs={12}
                                    sm
                                    sx={isSm ? undefined : { textAlign: 'center', mb: 1 }}
                                >
                                    {url === '/login' && <MuiLink variant='body2'>
                                        Forgot password?
                                    </MuiLink>}
                                </Grid>
                                <Grid item>
                                    <Link href={isRegister ? '/login' : '/register'}>
                                        <MuiLink variant='body2'>
                                            {isRegister ? 'Login' : 'Register'}
                                        </MuiLink>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

export default Form
