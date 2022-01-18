import { Button, ButtonGroup } from '@mui/material'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const AuthButtonGroup: FC = () => {
    const router = useRouter()

    return (
        <ButtonGroup variant="text">
            {router.pathname !== process.env.NEXT_PUBLIC_LOGIN_ROUTE && (
                <Button
                    onClick={() =>
                        router.push(process.env.NEXT_PUBLIC_LOGIN_ROUTE!)
                    }
                >
                    Login
                </Button>
            )}
            {router.pathname !== process.env.NEXT_PUBLIC_REGISTER_ROUTE && (
                <Button
                    onClick={() =>
                        router.push(process.env.NEXT_PUBLIC_REGISTER_ROUTE!)
                    }
                >
                    Register
                </Button>
            )}
        </ButtonGroup>
    )
}

export default AuthButtonGroup
