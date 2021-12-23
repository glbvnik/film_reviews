import { Box, Button, ButtonGroup, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useFormik } from 'formik'
import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { clearOmdb } from '../../redux/reducers/omdb'
import { fetchOmdbFilms } from '../../redux/reducers/omdb/action-creators'

const CreateReview: FC = () => {
    const dispatch = useAppDispatch()

    const [type, setType] = useState<'movie' | 'series'>('movie')

    const { handleSubmit, handleChange, resetForm, values } = useFormik({
        initialValues: {
            title: '',
        },
        onSubmit: (values) => {
            dispatch(fetchOmdbFilms({ title: values.title, page: 1, type }))
        },
    })

    const handleReset = () => {
        resetForm()

        dispatch(clearOmdb())
    }

    return (
        <Box noValidate component='form' onSubmit={handleSubmit} onReset={handleReset}>
            <ToggleButtonGroup
                exclusive
                fullWidth
                color='primary'
                value={type}
                onChange={(e, value) => setType(value)}
            >
                <ToggleButton value='movie'>Movie</ToggleButton>
                <ToggleButton value='series'>Series</ToggleButton>
            </ToggleButtonGroup>
            <TextField
                fullWidth
                id='title'
                name='title'
                size='medium'
                placeholder={type === 'movie' ? 'Film title...' : 'Series title...'} value={values.title}
                onChange={handleChange}
            />
            <ButtonGroup fullWidth variant='contained' size='large'>
                <Button type='submit'>Search</Button>
                <Button type='reset' color='secondary'>Reset</Button>
            </ButtonGroup>
        </Box>
    )
}

export default CreateReview
