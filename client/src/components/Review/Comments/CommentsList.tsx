import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { authSelectors } from '../../../redux/reducers/auth'
import { reviewsSelectors } from '../../../redux/reducers/reviews'
import { createComment } from '../../../redux/reducers/reviews/action-creators'
import ButtonLoader from '../../UI/ButtonLoader'
import CommentItem from './CommentItem'

const CommentsList: FC = () => {
    const { id, comments } = useAppSelector(reviewsSelectors.currentReview)!
    const isCommentLoading = useAppSelector(reviewsSelectors.isCommentLoading)
    const user = useAppSelector(authSelectors.user)

    const dispatch = useAppDispatch()

    const router = useRouter()

    const { handleSubmit, handleChange, resetForm, values } = useFormik({
        initialValues: {
            text: '',
        },
        onSubmit: (values) => {
            dispatch(createComment({ ...values, reviewId: id }))
        },
    })

    useEffect(() => {
        if (!isCommentLoading) {
            resetForm()

            router.replace(router.asPath, undefined, { scroll: false })
        }
    }, [isCommentLoading])

    return (
        <Box
            noValidate
            component="form"
            textAlign="right"
            onSubmit={handleSubmit}
        >
            {user?.isCommentsAllowed && (
                <>
                    <TextField
                        multiline
                        id="text"
                        name="text"
                        placeholder="Type your comment..."
                        rows={2}
                        value={values.text}
                        onChange={handleChange}
                        sx={{ width: '100%', mb: 1 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        endIcon={isCommentLoading && <ButtonLoader />}
                        sx={{ mb: 2 }}
                    >
                        Create comment
                    </Button>
                </>
            )}
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </Box>
    )
}

export default CommentsList
