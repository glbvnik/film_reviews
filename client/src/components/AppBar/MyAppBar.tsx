import { AppBar, Toolbar } from '@mui/material'
import React, { FC } from 'react'
import LeftSideAppBar from './LeftSideAppBar'
import RightSideAppBar from './RightSideAppBar'

const MyAppBar: FC = () => {
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex' }}>
                <LeftSideAppBar />
                <RightSideAppBar />
            </Toolbar>
        </AppBar>
    )
}

export default MyAppBar
