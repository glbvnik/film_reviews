import MovieIcon from '@mui/icons-material/Movie'
import SearchIcon from '@mui/icons-material/Search'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import SegmentIcon from '@mui/icons-material/Segment'
import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { createStyles } from '../../utils/createStyles'

interface ReviewsListStateProps {
    state: 'search-movie' | 'movie-not-found' | 'choose-section' | '404'
}

const wrapperSx = createStyles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
})

const StateMessage: FC<ReviewsListStateProps> = ({ state }) => {
    switch (state) {
        case 'search-movie':
            return (
                <Box sx={wrapperSx}>
                    <SearchIcon sx={{ fontSize: '100px' }} />
                    <Typography variant="h5">Search a movie</Typography>
                </Box>
            )
        case 'movie-not-found':
            return (
                <Box sx={wrapperSx}>
                    <MovieIcon sx={{ fontSize: '100px' }} />
                    <Typography variant="h5">No movies found</Typography>
                </Box>
            )
        case 'choose-section':
            return (
                <Box sx={wrapperSx}>
                    <SegmentIcon sx={{ fontSize: '100px' }} />
                    <Typography variant="h5">Choose section</Typography>
                </Box>
            )
        case '404':
            return (
                <Box sx={wrapperSx}>
                    <SearchOffIcon sx={{ fontSize: '100px' }} />
                    <Typography variant="h5">404 - Page Not Found</Typography>
                </Box>
            )
        default:
            return <></>
    }
}

export default StateMessage
