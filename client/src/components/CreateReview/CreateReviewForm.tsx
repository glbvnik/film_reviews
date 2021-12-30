import DoneIcon from '@mui/icons-material/Done'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { FC } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectOmdb } from '../../redux/reducers/omdb'
import { createReview } from '../../redux/reducers/review/action-creators'

const CreateReviewForm: FC = () => {
    const { currentFilm } = useAppSelector(selectOmdb)

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

    if (!currentFilm) {
        return <></>
    }

    return (
        <Box
            noValidate
            alignSelf="center"
            width="100%"
            component="form"
            onSubmit={handleSubmit}
        >
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
            <Button type="submit" variant="contained" sx={{ mb: 2 }}>
                Create review
            </Button>
        </Box>
    )
}

export default CreateReviewForm
