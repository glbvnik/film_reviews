import DoneIcon from '@mui/icons-material/Done'
import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { FC, useEffect } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectApp, setAsyncAction } from '../../redux/reducers/app'
import { selectOmdb } from '../../redux/reducers/omdb'
import { createReview } from '../../redux/reducers/review/action-creators'

const CreateReviewForm: FC = () => {
    const { currentFilm } = useAppSelector(selectOmdb)
    const { asyncAction } = useAppSelector(selectApp)

    const dispatch = useAppDispatch()

    const { handleSubmit, handleChange, setFieldValue, values } = useFormik({
        initialValues: {
            image: null,
            text: '',
        },
        onSubmit: (values) => {
            dispatch(createReview({ review: values, film: currentFilm! }))
        },
    })

    useEffect(() => {
        return () => {
            setAsyncAction({ isSuccess: false, errorMessage: '' })
        }
    }, [])

    useEffect(() => {
        if (asyncAction.errorMessage) {
            setFieldValue('isPublished', true)

            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [asyncAction.errorMessage])

    if (!currentFilm) {
        return <></>
    }
    if (asyncAction.isSuccess) {
        return <Box>Your review has been successfully published!</Box>
    }

    return (
        <Box
            noValidate
            alignSelf="center"
            width="100%"
            component="form"
            onSubmit={handleSubmit}
        >
            {asyncAction.errorMessage && (
                <Alert severity="error" sx={{ mb: 1 }}>
                    {asyncAction.errorMessage}
                </Alert>
            )}
            <Typography variant="h3" mb={2}>
                {currentFilm.Title}
            </Typography>
            <Typography variant="h4" mb={1}>
                Image
            </Typography>
            {values.image && (
                <Typography variant="h6" mb={1}>
                    {(values.image as File).name}
                </Typography>
            )}
            <Button
                component="label"
                variant="contained"
                endIcon={values.image && <DoneIcon color="success" />}
            >
                Upload Image
                <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setFieldValue('image', e.currentTarget.files![0])
                    }
                />
            </Button>
            <Typography variant="h4" mt={2} mb={1}>
                Review
            </Typography>
            <TextField
                multiline
                id="text"
                name="text"
                placeholder="Type your review..."
                rows={20}
                value={values.text}
                onChange={handleChange}
                sx={{ width: '100%', mb: 2 }}
            />
            <Box display="flex" justifyContent="space-between">
                <Button
                    type="submit"
                    variant="outlined"
                    onClick={() => setFieldValue('isPublished', false)}
                    sx={{ mb: 2 }}
                >
                    Create draft
                </Button>
                <Button type="submit" variant="contained" sx={{ mb: 2 }}>
                    Create review
                </Button>
            </Box>
        </Box>
    )
}

export default CreateReviewForm
