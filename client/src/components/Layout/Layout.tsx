import { CssBaseline } from '@mui/material'
import { FC } from 'react'

const Layout: FC = ({ children }) => {
    return (
        <div id='layout'>
            <CssBaseline />
            {children}
        </div>
    )
}

export default Layout
