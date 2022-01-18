import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectAuth } from '../../redux/reducers/auth'
import { logout } from '../../redux/reducers/auth/action-creators'
import { theme } from '../../theme'
import AuthButtonGroup from './AuthButtonGroup'

enum MenuOptionsEnum {
    ACCOUNT = 'Account',
    DASHBOARD = 'Dashboard',
    LOGOUT = 'Logout',
}

const RightSideAppBar: FC = () => {
    const { user } = useAppSelector(selectAuth)

    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const router = useRouter()

    const isSm = useMediaQuery(theme.breakpoints.up('sm'))

    const handleMenuItemClick = (option: string) => {
        setAnchorEl(null)

        switch (option) {
            case MenuOptionsEnum.LOGOUT:
                return dispatch(logout())
            case MenuOptionsEnum.DASHBOARD:
                return router.push(process.env.NEXT_PUBLIC_DASHBOARD_ROUTE!)
        }
    }

    const getMenuOptions = () => {
        if (user!.roles.length > 1) {
            return [
                MenuOptionsEnum.DASHBOARD,
                MenuOptionsEnum.ACCOUNT,
                MenuOptionsEnum.LOGOUT,
            ]
        }

        return [MenuOptionsEnum.ACCOUNT, MenuOptionsEnum.LOGOUT]
    }

    if (!user) {
        return <AuthButtonGroup />
    }

    return (
        <>
            <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ borderRadius: 0, color: 'white', fontSize: '21px' }}
            >
                {isSm && user.firstName}
                <AccountCircleIcon
                    sx={{
                        color: 'white',
                        fontSize: '42px',
                        ml: '4px',
                    }}
                />
            </IconButton>
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
        </>
    )
}

export default RightSideAppBar
