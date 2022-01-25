import { Box, Drawer } from '@mui/material'
import React, { FC } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { appSelectors, setIsMobileDrawerOpen } from '../../redux/reducers/app'
import DrawerSectionsList from './DrawerSectionsList'

export const drawerWidth = 200

const DrawerMenu: FC = () => {
    const isMobileDrawerOpen = useAppSelector(appSelectors.isMobileDrawerOpen)

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

export default DrawerMenu
