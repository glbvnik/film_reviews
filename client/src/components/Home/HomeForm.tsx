import { Box, Button, ButtonGroup, TextField } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { getReviews } from '../../redux/reducers/reviews/action-creators'
import { theme } from '../../theme'

const HomeForm: FC = () => {
    const dispatch = useAppDispatch()

    const router = useRouter()

    const { handleSubmit, handleChange, resetForm, values } = useFormik({
        initialValues: {
            movie: (router.query.movie as string) || '',
            author: (router.query.author as string) || '',
        },
        onSubmit: (values) => {
            dispatch(getReviews({ ...values, limit: 20, offset: 0 }))

            router.push(
                {
                    pathname: '/',
                    query: { ...values, page: 1 },
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
        resetForm({ values: { movie: '', author: '' } })

        router.push('/')
    }

    return (
        <Box
            noValidate
            component="form"
            onSubmit={handleSubmit}
            onReset={handleReset}
            mb={{ xs: 1, sm: 2, lg: 3, xl: 4 }}
        >
            <Box display="flex" flexDirection={isSm ? 'row' : 'column'}>
                <TextField
                    id="movie"
                    name="movie"
                    size="medium"
                    placeholder="Movie..."
                    value={values.movie}
                    onChange={handleChange}
                    sx={{ flex: '1 0 40%' }}
                />
                <TextField
                    id="author"
                    name="author"
                    size="medium"
                    placeholder="Author..."
                    value={values.author}
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

export default HomeForm
