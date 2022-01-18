import { Drawer } from '@mui/material'
import Box from '@mui/material/Box'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectApp, setIsMobileDrawerOpen } from '../../redux/reducers/app'
import DrawerOptionsList from './DrawerOptionsList'

export const drawerWidth = 175

const DashboardDrawer: FC = () => {
    const { isMobileDrawerOpen } = useAppSelector(selectApp)

    const dispatch = useDispatch()

    return (
        <Box
            component="nav"
            sx={{ flexShrink: { md: 0 }, width: { md: drawerWidth } }}
        >
            <Drawer
                open={isMobileDrawerOpen}
                variant="temporary"
                ModalProps={{
                    keepMounted: true,
                }}
                onClose={() =>
                    dispatch(setIsMobileDrawerOpen(!isMobileDrawerOpen))
                }
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '.MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
            >
                <DrawerOptionsList />
            </Drawer>
            <Drawer
                open
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '.MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        top: 64,
                    },
                }}
            >
                <DrawerOptionsList />
            </Drawer>
        </Box>
    )
}

export default DashboardDrawer
