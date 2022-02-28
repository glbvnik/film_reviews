import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ClearIcon from '@mui/icons-material/Clear'
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled'
import InsertCommentIcon from '@mui/icons-material/InsertComment'
import { Box, IconButton, ListItem, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { UserApi } from '../../../http/user'
import { IComment } from '../../../models/comment'
import { RolesEnum } from '../../../models/user'
import { authSelectors } from '../../../redux/reducers/auth'
import { deleteComment } from '../../../redux/reducers/reviews/action-creators'
import UserDialog from './UserDialog'

interface CommentItemProps {
    comment: IComment
}

const CommentItem: FC<CommentItemProps> = ({ comment }) => {
    const user = useAppSelector(authSelectors.user)

    const dispatch = useAppDispatch()

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const router = useRouter()

    const isDeleteAllowed = !!(
        user &&
        comment.author?.uuId &&
        user?.uuId === comment.author?.uuId
    )
    const isBanAllowed = user?.roles.includes(RolesEnum.MODERATOR)

    const handleFirstNameClick = () => {
        if (isBanAllowed) {
            setIsDialogOpen(true)
        }
    }

    const handleCommentIconClick = async () => {
        await UserApi.allowComments({
            uuId: comment.author.uuId!,
            isCommentsAllowed: !comment.author.isCommentsAllowed,
        })

        router.replace(router.asPath, undefined, { scroll: false })
    }

    return (
        <ListItem
            disableGutters
            sx={{
                border: `1px solid ${orange[800]}`,
                borderRadius: '4px',
                p: { xs: 1, md: 2 },
                mb: 1,
            }}
        >
            <AccountCircleIcon fontSize="large" sx={{ mr: 1 }} />
            <Box>
                <Typography
                    variant="h6"
                    mr={1}
                    onClick={handleFirstNameClick}
                    sx={{ cursor: isBanAllowed ? 'pointer' : 'initial' }}
                >
                    {comment.author.firstName}
                </Typography>
                <UserDialog
                    uuId={comment.author.uuId!}
                    email={comment.author.email!}
                    open={isDialogOpen}
                    handleClose={() => setIsDialogOpen(false)}
                />
                <Typography component="p" lineHeight={1.2}>
                    {comment.text}
                </Typography>
            </Box>
            {(isDeleteAllowed || isBanAllowed) && (
                <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                    {isBanAllowed && (
                        <IconButton onClick={handleCommentIconClick}>
                            {comment.author.isCommentsAllowed ? (
                                <CommentsDisabledIcon color="error" />
                            ) : (
                                <InsertCommentIcon />
                            )}
                        </IconButton>
                    )}
                    <IconButton
                        onClick={() => dispatch(deleteComment(comment.id))}
                    >
                        <ClearIcon />
                    </IconButton>
                </Box>
            )}
        </ListItem>
    )
}

export default CommentItem
