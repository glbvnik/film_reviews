import { Grid, Typography } from '@mui/material'
import React, { FC } from 'react'
import { IOmdbFullFilm } from '../../../models/omdb'

interface OmdbDefinitionListProps {
    currentFilm: IOmdbFullFilm
}

const OmdbDefinitionList: FC<OmdbDefinitionListProps> = ({ currentFilm }) => {
    const data = [
        { name: 'IMDB Id', value: currentFilm.imdbID },
        { name: 'Title', value: currentFilm.Title },
        { name: 'Year', value: currentFilm.Year },
        { name: 'Country', value: currentFilm.Country },
        { name: 'Genre', value: currentFilm.Genre },
        { name: 'Runtime', value: currentFilm.Runtime },
        { name: 'Director', value: currentFilm.Director },
        { name: 'Actors', value: currentFilm.Actors },
        { name: 'IMDB Rating', value: currentFilm.imdbRating },
    ]

    return (
        <Grid
            container
            component="dl"
            display="flex"
            flexDirection="column"
            spacing={2}
        >
            {data.map((d) => (
                <Grid
                    key={d.name}
                    item
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography component="dt" variant="h6" mr={3}>
                        {d.name}
                    </Typography>
                    <Typography component="dd" textAlign="right">
                        {d.value}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    )
}

export default OmdbDefinitionList
