import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, IconButton, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { appSelectors, setIsMobileDrawerOpen } from '../../redux/reducers/app'

const LeftSideAppBar: FC = () => {
    const isDrawer = useAppSelector(appSelectors.isDrawer)
    const isMobileDrawerOpen = useAppSelector(appSelectors.isMobileDrawerOpen)

    const dispatch = useAppDispatch()

    const router = useRouter()

    return (
        <>
            {isDrawer && (
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
                onClick={() => router.push('/1')}
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
