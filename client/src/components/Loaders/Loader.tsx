import { Box, CircularProgress } from '@mui/material'

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
