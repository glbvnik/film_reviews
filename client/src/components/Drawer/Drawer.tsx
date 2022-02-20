import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { DrawerSectionsEnum } from '../../constants/drawerSections'
import withRoles from '../../hoc/withRoles'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { RolesEnum } from '../../models/user'
import { setIsDrawer } from '../../redux/reducers/app'
import { clearReviews } from '../../redux/reducers/reviews'
import AllowComments from '../AllowComments/AllowComments'
import ChangePassword from '../ChangePassword/ChangePassword'
import FilmsForReview from '../FilmsForReview/FilmsForReview'
import ManageUsers from '../ManageUsers/ManageUsers'
import ReviewForm from '../ReviewForm/ReviewForm'
import ReviewsListWrapped from '../ReviewsList/ReviewsListWrapped'
import StateMessage from '../UI/StateMessage'
import Wrapper from '../UI/Wrapper'
import DrawerMenu from './DrawerMenu'

const ReviewsListEditor = withRoles(ReviewsListWrapped, [RolesEnum.EDITOR])
const ReviewsListWriter = withRoles(ReviewsListWrapped, [RolesEnum.WRITER])

const Drawer: FC = () => {
    const dispatch = useAppDispatch()

    const router = useRouter()

    const renderSection = () => {
        if (
            router.pathname.split('/')[2] === DrawerSectionsEnum.UPDATE_REVIEW
        ) {
            return <ReviewForm />
        }

        switch (router.query.section) {
            case DrawerSectionsEnum.CHANGE_PASSWORD:
                return <ChangePassword />
            case DrawerSectionsEnum.MY_REVIEWS:
                return <ReviewsListWriter />
            case DrawerSectionsEnum.FILMS_FOR_REVIEW:
                return <FilmsForReview />
            case DrawerSectionsEnum.CREATE_REVIEW:
                return <ReviewForm />
            case DrawerSectionsEnum.UNPUBLISHED_REVIEWS:
                return <ReviewsListEditor />
            case DrawerSectionsEnum.MANAGE_USERS:
                return <ManageUsers />
            case DrawerSectionsEnum.ALLOW_COMMENTS:
                return <AllowComments />
            default:
                return (
                    <Wrapper isRelative>
                        <StateMessage state="choose-section" />
                    </Wrapper>
                )
        }
    }

    useEffect(() => {
        dispatch(setIsDrawer(true))
        dispatch(clearReviews())

        return () => {
            dispatch(setIsDrawer(false))
        }
    }, [])

    return (
        <Box display="flex" flexGrow={1} overflow="hidden">
            <DrawerMenu />
            {renderSection()}
        </Box>
    )
}

export default Drawer
