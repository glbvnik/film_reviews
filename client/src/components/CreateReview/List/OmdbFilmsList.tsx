import { List } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectOmdb } from '../../../redux/reducers/omdb'
import OmdbFilmItem from './OmdbFilmItem'

const OmdbFilmsList = () => {
    const { films } = useSelector(selectOmdb)

    return (
        <List>
            {films?.map((film) => (
                <OmdbFilmItem key={Math.random()} film={film} />
            ))}
        </List>
    )
}

export default OmdbFilmsList
