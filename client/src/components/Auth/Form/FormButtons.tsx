import { Button, Grid, Link as MuiLink } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import Link from 'next/link'
import { FC } from 'react'
import { theme } from '../../../theme'

interface FormButtonsProps {
    isRegisterUrl: boolean
    isLoginUrl: boolean
    isForgetPasswordUrl: boolean
    isResetPasswordUrl: boolean
}

const FormButtons: FC<FormButtonsProps> = ({
    isRegisterUrl,
    isLoginUrl,
    isForgetPasswordUrl,
    isResetPasswordUrl,
}) => {
    const isSm = useMediaQuery(theme.breakpoints.up('sm'))

    const renderButtonText = () => {
        if (isRegisterUrl) {
            return 'Register'
        } else if (isLoginUrl) {
            return 'Login'
        } else if (isForgetPasswordUrl) {
            return 'Send link'
        } else if (isResetPasswordUrl) {
            return 'Reset'
        }
    }

    return (
        <>
            <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                {renderButtonText()}
            </Button>
            <Grid container justifyContent="center">
                <Grid
                    item
                    xs={12}
                    sm
                    sx={isSm ? undefined : { textAlign: 'center', mb: 1 }}
                >
                    {isLoginUrl && (
                        <Link
                            href={
                                process.env.NEXT_PUBLIC_FORGOT_PASSWORD_ROUTE!
                            }
                        >
                            <MuiLink variant="body2">Forgot password?</MuiLink>
                        </Link>
                    )}
                </Grid>
                {(isRegisterUrl || isLoginUrl) && (
                    <Grid item>
                        <Link
                            href={
                                isRegisterUrl
                                    ? process.env.NEXT_PUBLIC_LOGIN_ROUTE!
                                    : process.env.NEXT_PUBLIC_REGISTER_ROUTE!
                            }
                        >
                            <MuiLink variant="body2">
                                {isRegisterUrl ? 'Login' : 'Register'}
                            </MuiLink>
                        </Link>
                    </Grid>
                )}
            </Grid>
        </>
    )
}

export default FormButtons
