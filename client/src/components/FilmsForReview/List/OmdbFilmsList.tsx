import { List, Pagination } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { omdbSelectors, setOmdbPage } from '../../../redux/reducers/omdb'
import { theme } from '../../../theme'
import Loader from '../../UI/Loader'
import StateMessage from '../../UI/StateMessage'
import OmdbFilmItem from './OmdbFilmItem'

const OmdbFilmsList = () => {
    const films = useAppSelector(omdbSelectors.films)
    const totalResults = useAppSelector(omdbSelectors.totalResults)
    const page = useAppSelector(omdbSelectors.page)
    const isLoading = useAppSelector(omdbSelectors.isOmdbLoading)

    const dispatch = useAppDispatch()

    const router = useRouter()

    const isSm = useMediaQuery(theme.breakpoints.up('sm'))

    const handleChange = (value: number) => {
        dispatch(setOmdbPage(value))

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        return () => {
            if (
                router.pathname !==
                process.env.NEXT_PUBLIC_REVIEWS_FILMS_FOR_REVIEW_ROUTE
            ) {
                dispatch(setOmdbPage(1))
            }
        }
    }, [])

    if (!films) {
        return <StateMessage state="search-movie" />
    }

    if (isLoading) {
        return <Loader />
    }

    if (films.length === 0) {
        return <StateMessage state="movie-not-found" />
    }

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
