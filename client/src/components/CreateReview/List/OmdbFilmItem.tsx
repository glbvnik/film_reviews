import { ListItem, ListItemText, Paper, Skeleton } from '@mui/material'
import Image from 'next/image'
import React, { FC } from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { IOmdbFilm } from '../../../models/omdb'
import { setIsDialog } from '../../../redux/reducers/app'
import { getOmdbFullFilm } from '../../../redux/reducers/omdb/action-creators'
import { useStyles } from '../../../styles/classes'
import { checkHttpUrl } from '../../../utils/checkHttpUrl'

interface OmdbFilmItemProps {
    film: IOmdbFilm
}

const OmdbFilmItem: FC<OmdbFilmItemProps> = ({ film }) => {
    const dispatch = useAppDispatch()

    const classes = useStyles()

    const handleClick = async () => {
        dispatch(setIsDialog(true))
        dispatch(getOmdbFullFilm({ imdbId: film.imdbID, title: film.Title }))
    }

    return (
        <ListItem
            disablePadding
            component={Paper}
            onClick={handleClick}
            sx={{ mb: 1 }}
        >
            {checkHttpUrl(film.Poster) ? (
                <Image
                    src={film.Poster}
                    objectFit="cover"
                    height={200}
                    width={140}
                    className={classes.omdbBookImage}
                />
            ) : (
                <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height={200}
                    width={140}
                />
            )}
            <ListItemText
                primary={film.Title}
                secondary={film.Year}
                sx={{ flex: '1 1', ml: 1 }}
            />
        </ListItem>
    )
}

export default OmdbFilmItem
