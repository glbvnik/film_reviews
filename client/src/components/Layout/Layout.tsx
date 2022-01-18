import { CssBaseline } from '@mui/material'
import { FC } from 'react'
import MyAppBar from '../AppBar/MyAppBar'

const Layout: FC = ({ children }) => {
    return (
        <div id="layout">
            <CssBaseline />
            <MyAppBar />
            {children}
        </div>
    )
}

export default Layout
