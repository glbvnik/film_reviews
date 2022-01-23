import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { DrawerSectionsEnum } from '../../constants/drawerSections'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { setIsDrawer } from '../../redux/reducers/app'
import CreateReviewForm from '../CreateReview/CreateReviewForm'
import FilmsForReview from '../FilmsForReview/FilmsForReview'
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
