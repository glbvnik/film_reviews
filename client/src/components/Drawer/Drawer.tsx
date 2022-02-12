import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { DrawerSectionsEnum } from '../../constants/drawerSections'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { setIsDrawer } from '../../redux/reducers/app'
import AllowComments from '../AllowComments/AllowComments'
import ChangePassword from '../ChangePassword/ChangePassword'
import CreateReviewForm from '../CreateReview/CreateReviewForm'
import FilmsForReview from '../FilmsForReview/FilmsForReview'
import ManageUsers from '../ManageUsers/ManageUsers'
import DrawerMenu from './DrawerMenu'

const Drawer: FC = () => {
    const dispatch = useAppDispatch()

    const router = useRouter()

    const renderSection = () => {
        switch (router.query.section) {
            case DrawerSectionsEnum.FILMS_FOR_REVIEW:
                return <FilmsForReview />
            case DrawerSectionsEnum.CREATE_REVIEW:
                return <CreateReviewForm />
            case DrawerSectionsEnum.MANAGE_USERS:
                return <ManageUsers />
            case DrawerSectionsEnum.ALLOW_COMMENTS:
                return <AllowComments />
            case DrawerSectionsEnum.CHANGE_PASSWORD:
                return <ChangePassword />
            default:
                return <></>
        }
    }

    useEffect(() => {
        dispatch(setIsDrawer(true))

        return () => {
            dispatch(setIsDrawer(false))
        }
    }, [])

    return (
        <Box display="flex" overflow="hidden">
            <DrawerMenu />
            {renderSection()}
        </Box>
    )
}

export default Drawer
