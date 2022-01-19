import { Box, Drawer } from '@mui/material'
import React, { FC } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectApp, setIsMobileDrawerOpen } from '../../redux/reducers/app'
import DrawerSectionsList from './DrawerSectionsList'

export const drawerWidth = 175

const DashboardDrawer: FC = () => {
    const { isMobileDrawerOpen } = useAppSelector(selectApp)

    const dispatch = useAppDispatch()

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
                <DrawerSectionsList />
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
                <DrawerSectionsList />
            </Drawer>
        </Box>
    )
}

export default DashboardDrawer
