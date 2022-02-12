import DoneIcon from '@mui/icons-material/Done'
import {
    Alert,
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { FC, useEffect, useRef } from 'react'
import withRoles from '../../hoc/withRoles'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { RolesEnum } from '../../models/user'
import { appSelectors, setAsyncAction } from '../../redux/reducers/app'
import { omdbSelectors } from '../../redux/reducers/omdb'
import { reviewsSelectors } from '../../redux/reducers/reviews'
import { createReview } from '../../redux/reducers/reviews/action-creators'
import { useStyles } from '../../styles/classes'
import ActionMessage from '../UI/ActionMessage'
import ButtonLoader from '../UI/ButtonLoader'

const CreateReviewForm: FC = () => {
    const currentFilm = useAppSelector(omdbSelectors.currentFilm)
    const isReviewsLoading = useAppSelector(reviewsSelectors.isReviewsLoading)
    const asyncAction = useAppSelector(appSelectors.asyncAction)

    const dispatch = useAppDispatch()

    const alertRef = useRef<HTMLDivElement>(null)

    const { handleSubmit, handleChange, setFieldValue, values } = useFormik({
        initialValues: {
            image: null,
            text: '',
        },
        onSubmit: (values) => {
            dispatch(createReview({ review: values, film: currentFilm! }))
        },
    })

    const classes = useStyles()

    const handleClick = (isDraft?: boolean) => {
        if (isDraft) {
            setFieldValue('isPublished', false)
        }

        dispatch(setAsyncAction({ isSuccess: false, errorMessage: '' }))
    }

    useEffect(() => {
        return () => {
            dispatch(setAsyncAction({ isSuccess: false, errorMessage: '' }))
        }
    }, [])

    useEffect(() => {
        if (asyncAction.errorMessage) {
            setFieldValue('isPublished', true)

            alertRef.current!.scrollIntoView()
        }
    }, [asyncAction.errorMessage])

    if (!currentFilm) {
        return <></>
    }

    if (asyncAction.isSuccess) {
        return (
            <ActionMessage message="Your review has been successfully published!" />
        )
    }

    return (
        <Box className={classes.scrollBox}>
            <Container>
                <Box
                    noValidate
                    component="form"
                    p="12px 12px 0 12px"
                    onSubmit={handleSubmit}
                >
                    {asyncAction.errorMessage && (
                        <Alert severity="error" ref={alertRef} sx={{ mb: 1 }}>
                            {asyncAction.errorMessage}
                        </Alert>
                    )}
                    <Typography variant="h3">{currentFilm.Title}</Typography>
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
                                setFieldValue(
                                    'image',
                                    e.currentTarget.files![0]
                                )
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
                            color="secondary"
                            type="submit"
                            variant="contained"
                            endIcon={isReviewsLoading && <ButtonLoader />}
                            onClick={() => handleClick(true)}
                            sx={{ mb: 2 }}
                        >
                            Create draft
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            endIcon={isReviewsLoading && <ButtonLoader />}
                            onClick={() => handleClick()}
                            sx={{ mb: 2 }}
                        >
                            Create review
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default withRoles(CreateReviewForm, [RolesEnum.WRITER])
