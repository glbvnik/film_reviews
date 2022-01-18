import Box from '@mui/material/Box'
import React, { FC } from 'react'
import FilmsForReview from '../FilmsForReview/FilmsForReview'
import DashboardDrawer from './DashboardDrawer'

const Dashboard: FC = () => {
    return (
        <Box display="flex">
            <DashboardDrawer />
            <FilmsForReview />
        </Box>
    )
}

export default Dashboard
