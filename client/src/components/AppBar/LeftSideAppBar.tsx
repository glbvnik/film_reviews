import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, IconButton, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectApp, setIsMobileDrawerOpen } from '../../redux/reducers/app'

const LeftSideAppBar: FC = () => {
    const { isMobileDrawerOpen } = useAppSelector(selectApp)

    const dispatch = useAppDispatch()

    const router = useRouter()

    return (
        <>
            {router.pathname === process.env.NEXT_PUBLIC_DASHBOARD_ROUTE && (
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={() =>
                        dispatch(setIsMobileDrawerOpen(!isMobileDrawerOpen))
                    }
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            )}
            <Box
                display="flex"
                alignItems="center"
                onClick={() => router.push('/')}
                sx={{ cursor: 'pointer', mr: 'auto' }}
            >
                <LocalMoviesIcon />
                <Typography
                    variant="h6"
                    component="h1"
                    ml="2px"
                    sx={{ userSelect: 'none' }}
                >
                    IReview
                </Typography>
            </Box>
        </>
    )
}

export default LeftSideAppBar
