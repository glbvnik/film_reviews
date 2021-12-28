import { List, Pagination } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { selectOmdb, setOmdbPage } from '../../../redux/reducers/omdb'
import { theme } from '../../../theme'
import OmdbFilmItem from './OmdbFilmItem'

const OmdbFilmsList = () => {
    const { films, totalResults, page } = useSelector(selectOmdb)

    const dispatch = useAppDispatch()

    const isSm = useMediaQuery(theme.breakpoints.up('sm'))

    const handleChange = (value: number) => {
        dispatch(setOmdbPage(value))

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        return () => handleChange(1)
    }, [])

    return (
        <>
            <List>
                {films?.map((film) => (
                    <OmdbFilmItem key={Math.random()} film={film} />
                ))}
            </List>
            {totalResults > 10 && (
                <Pagination
                    size={isSm ? 'large' : 'small'}
                    count={Math.ceil(totalResults / 10)}
                    page={page}
                    onChange={(_, value) => handleChange(value)}
                    sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
                />
            )}
        </>
    )
}

export default OmdbFilmsList
