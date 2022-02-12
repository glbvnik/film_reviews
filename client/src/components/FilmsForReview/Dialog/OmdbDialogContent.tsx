import { Box, CircularProgress, Paper } from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'
import { IOmdbFullFilm } from '../../../models/omdb'
import { checkHttpUrl } from '../../../utils/checkHttpUrl'
import OmdbDefinitionList from './OmdbDefinitionList'

interface OmdbDialogContentProps {
    currentFilm: IOmdbFullFilm | null
    isLoading: boolean
}

const OmdbDialogContent: FC<OmdbDialogContentProps> = ({
    currentFilm,
    isLoading,
}) => {
    return (
        <Box
            sx={
                isLoading
                    ? {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 1,
                          minHeight: 350,
                          minWidth: 350,
                      }
                    : undefined
            }
        >
            {isLoading && <CircularProgress />}
            {currentFilm && checkHttpUrl(currentFilm.Poster) && (
                <Box bgcolor="primary.main" textAlign="center" height={420}>
                    <Image
                        src={currentFilm.Poster}
                        height={420}
                        width={280}
                        objectFit="cover"
                    />
                </Box>
            )}
            {currentFilm && (
                <Box p={1}>
                    <OmdbDefinitionList currentFilm={currentFilm} />
                    <Paper
                        elevation={0}
                        sx={{ fontSize: '18px', lineHeight: 1.7, mt: 2 }}
                    >
                        {currentFilm.Plot}
                    </Paper>
                </Box>
            )}
        </Box>
    )
}

export default OmdbDialogContent
