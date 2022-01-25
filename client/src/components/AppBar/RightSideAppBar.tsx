import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { MenuOptionsEnum } from '../../constants/menuOptions'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { RolesEnum } from '../../models/user'
import { authSelectors } from '../../redux/reducers/auth'
import { logout } from '../../redux/reducers/auth/action-creators'
import { theme } from '../../theme'
import AuthButtonGroup from './AuthButtonGroup'

const RightSideAppBar: FC = () => {
    const user = useAppSelector(authSelectors.user)
    const isRefreshLoading = useAppSelector(authSelectors.isRefreshLoading)
    const isLogoutLoading = useAppSelector(authSelectors.isLogoutLoading)

    const dispatch = useAppDispatch()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const router = useRouter()

    const isSm = useMediaQuery(theme.breakpoints.up('sm'))

    const isLoading = isRefreshLoading || isLogoutLoading

    const handleMenuItemClick = (option: string) => {
        setAnchorEl(null)

        switch (option) {
            case MenuOptionsEnum.ACCOUNT:
                return router.push(process.env.NEXT_PUBLIC_ACCOUNT_ROUTE!)
            case MenuOptionsEnum.ADMINISTRATION:
                return router.push(
                    process.env.NEXT_PUBLIC_ADMINISTRATION_ROUTE!
                )
            case MenuOptionsEnum.REVIEWS:
                return router.push(process.env.NEXT_PUBLIC_REVIEWS_ROUTE!)
            case MenuOptionsEnum.LOGOUT:
                return dispatch(logout())
        }
    }

    const getMenuOptions = () => {
        const options = [MenuOptionsEnum.ACCOUNT, MenuOptionsEnum.LOGOUT]

        if (
            user!.roles.includes(RolesEnum.ADMIN) ||
            user!.roles.includes(RolesEnum.MODERATOR)
        ) {
            options.unshift(MenuOptionsEnum.ADMINISTRATION)
        }
        if (user!.roles.includes(RolesEnum.WRITER)) {
            options.unshift(MenuOptionsEnum.REVIEWS)
        }

        return options
    }

    if (!user && !isLoading) {
        return <AuthButtonGroup />
    }

    return (
        <>
            <IconButton
                disabled={isLoading}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ borderRadius: 0, color: 'white', fontSize: '21px' }}
            >
                {isSm && !isLoading && user!.firstName}
                {isLoading ? (
                    <CircularProgress color="secondary" />
                ) : (
                    <AccountCircleIcon
                        sx={{
                            color: 'white',
                            fontSize: '42px',
                            ml: '4px',
                        }}
                    />
                )}
            </IconButton>
            {user && !isLoading && (
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={!!anchorEl}
                    onClose={() => setAnchorEl(null)}
                    sx={{ mt: isSm ? '48px' : '42px' }}
                >
                    {getMenuOptions().map((option) => (
                        <MenuItem
                            key={option}
                            onClick={() => handleMenuItemClick(option)}
                        >
                            <Typography textAlign="center">{option}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </>
    )
}

export default RightSideAppBar
