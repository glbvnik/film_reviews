import { Box, CircularProgress } from '@mui/material'

const Loader = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            zIndex={-1}
        >
            <CircularProgress />
        </Box>
    )
}

export default Loader
