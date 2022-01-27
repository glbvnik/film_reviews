import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
        >
            <CircularProgress />
        </Box>
    )
}

export default Loader
