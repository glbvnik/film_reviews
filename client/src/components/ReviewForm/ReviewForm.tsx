import DoneIcon from '@mui/icons-material/Done'
import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef } from 'react'
import { DrawerSectionsEnum } from '../../constants/drawerSections'
import withRoles from '../../hoc/withRoles'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { ReviewActionsEnum } from '../../models/review'
import { RolesEnum } from '../../models/user'
import Custom404 from '../../pages/404'
import { appSelectors, clearAsyncAction } from '../../redux/reducers/app'
import { authSelectors } from '../../redux/reducers/auth'
import { clearOmdbCurrentFilm, omdbSelectors } from '../../redux/reducers/omdb'
import {
    clearCurrentReview,
    reviewsSelectors,
} from '../../redux/reducers/reviews'
import {
    createReview,
    deleteReview,
    getReview,
    updateReview,
} from '../../redux/reducers/reviews/action-creators'
import ActionMessage from '../UI/ActionMessage'
import ButtonLoader from '../UI/ButtonLoader'
import Loader from '../UI/Loader'
import Wrapper from '../UI/Wrapper'

const ReviewForm: FC = () => {
    const currentFilm = useAppSelector(omdbSelectors.currentFilm)
    const currentReview = useAppSelector(reviewsSelectors.currentReview)
    const isReviewsLoading = useAppSelector(reviewsSelectors.isReviewsLoading)
    const asyncAction = useAppSelector(appSelectors.asyncAction)
    const user = useAppSelector(authSelectors.user)

    const dispatch = useAppDispatch()

    const alertRef = useRef<HTMLDivElement>(null)

    const router = useRouter()

    const isUpdateReview =
        router.pathname.split('/')[2] === DrawerSectionsEnum.UPDATE_REVIEW

    const { handleSubmit, handleChange, setFieldValue, values } = useFormik({
        initialValues: {
            image: null,
            text: '',
            isPublished: true,
        },
        onSubmit: (values) => {
            if (isUpdateReview) {
                dispatch(updateReview(values))
            } else {
                dispatch(createReview({ review: values, film: currentFilm! }))
            }
        },
    })

    const handleClick = (isDraft?: boolean) => {
        if (isDraft) {
            setFieldValue('isPublished', false)
        }

        dispatch(clearAsyncAction())
    }

    const getActionMessage = () => {
        switch (asyncAction.type) {
            case ReviewActionsEnum.CREATE_REVIEW:
                return 'Your review has been created!'
            case ReviewActionsEnum.UPDATE_REVIEW:
                return 'Your review has been updated!'
            case ReviewActionsEnum.DELETE_REVIEW:
                return 'Your review has been deleted!'
            default:
                return ''
        }
    }

    useEffect(() => {
        dispatch(clearCurrentReview())

        return () => {
            dispatch(clearAsyncAction())
            dispatch(clearOmdbCurrentFilm())
        }
    }, [])

    useEffect(() => {
        if (isUpdateReview && router.query.id) {
            dispatch(getReview(+router.query.id!))
        }
    }, [router.query.id])

    useEffect(() => {
        if (isUpdateReview && currentReview) {
            setFieldValue(
                'text',
                currentReview.text
                    .split(/<p class='review-text-p'>|<\/p>/)
                    .filter((p) => p && !p.match(/[\r]{n}/))
                    .join('\n\n')
            )
        }
    }, [currentReview])

    useEffect(() => {
        if (asyncAction.errorMessage) {
            setFieldValue('isPublished', true)

            alertRef.current!.scrollIntoView()
        }
    }, [asyncAction.errorMessage])

    if (asyncAction.isSuccess) {
        return <ActionMessage message={getActionMessage()} />
    }

    if (!currentFilm && !isUpdateReview) {
        return <Custom404 />
    }

    if (!currentFilm) {
        return <Loader />
    }

    if (
        isUpdateReview &&
        !user?.roles.includes(RolesEnum.EDITOR) &&
        currentReview?.author.uuId !== user?.uuId
    ) {
        return <Custom404 />
    }

    return (
        <Wrapper>
            <Box noValidate component="form" onSubmit={handleSubmit}>
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
                    {isUpdateReview &&
                        user!.uuId === currentReview!.author.uuId && (
                            <Button
                                color="error"
                                type="submit"
                                variant="contained"
                                endIcon={isReviewsLoading && <ButtonLoader />}
                                onClick={() => dispatch(deleteReview())}
                                sx={{ mb: 2 }}
                            >
                                Delete
                            </Button>
                        )}
                    <Button
                        color="secondary"
                        type="submit"
                        variant="contained"
                        endIcon={isReviewsLoading && <ButtonLoader />}
                        onClick={() => handleClick(true)}
                        sx={{ mb: 2 }}
                    >
                        {isUpdateReview ? 'Make draft' : 'Create draft'}
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        endIcon={isReviewsLoading && <ButtonLoader />}
                        onClick={() => handleClick()}
                        sx={{ mb: 2 }}
                    >
                        {isUpdateReview ? 'Publish' : 'Create review'}
                    </Button>
                </Box>
            </Box>
        </Wrapper>
    )
}

export default withRoles(ReviewForm, [RolesEnum.EDITOR, RolesEnum.WRITER])
