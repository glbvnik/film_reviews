import {
    Box,
    Button,
    ButtonGroup,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { clearOmdb, omdbSelectors } from '../../redux/reducers/omdb'
import { getOmdbFilms } from '../../redux/reducers/omdb/action-creators'
import { theme } from '../../theme'

const FilmsForReviewForm: FC = () => {
    const currentFilm = useAppSelector(omdbSelectors.currentFilm)
    const films = useAppSelector(omdbSelectors.films)
    const page = useAppSelector(omdbSelectors.page)

    const dispatch = useAppDispatch()

    const [type, setType] = useState<'movie' | 'series'>('movie')

    const router = useRouter()

    const { handleSubmit, handleChange, resetForm, setFieldValue, values } =
        useFormik({
            initialValues: {
                title: '',
            },
            onSubmit: (values) => {
                dispatch(getOmdbFilms({ title: values.title, page, type }))

                router.push(
                    {
                        pathname:
                            process.env
                                .NEXT_PUBLIC_REVIEWS_FILMS_FOR_REVIEW_ROUTE,
                        query: { title: values.title },
                    },
                    undefined,
                    {
                        shallow: true,
                    }
                )
            },
        })

    const isSm = useMediaQuery(theme.breakpoints.up('sm'))

    const handleReset = () => {
        resetForm()

        dispatch(clearOmdb())
    }

    const handleToggle = (value: 'movie' | 'series') => {
        dispatch(clearOmdb())

        setType(value)
    }

    useEffect(() => {
        if (router.query.title) {
            setFieldValue('title', router.query.title)
        }
    }, [])

    useEffect(() => {
        if (!currentFilm && films) {
            handleSubmit()
        }
    }, [page])

    return (
        <Box
            noValidate
            component="form"
            onSubmit={handleSubmit}
            onReset={handleReset}
        >
            <ToggleButtonGroup
                exclusive
                fullWidth
                color="primary"
                value={type}
                onChange={(_, value) => handleToggle(value)}
            >
                <ToggleButton value="movie">Movie</ToggleButton>
                <ToggleButton value="series">Series</ToggleButton>
            </ToggleButtonGroup>
            <Box display="flex" flexDirection={isSm ? 'row' : 'column'}>
                <TextField
                    id="title"
                    name="title"
                    size="medium"
                    placeholder={
                        type === 'movie' ? 'Film title...' : 'Series title...'
                    }
                    value={values.title}
                    onChange={handleChange}
                    sx={{ flexGrow: 1 }}
                />
                <ButtonGroup variant="contained" size="large" fullWidth={!isSm}>
                    <Button type="submit">Search</Button>
                    <Button type="reset" color="secondary">
                        Reset
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    )
}

export default FilmsForReviewForm
