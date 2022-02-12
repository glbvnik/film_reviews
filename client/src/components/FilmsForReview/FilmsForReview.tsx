import { Container } from '@mui/material'
import { Box } from '@mui/system'
import { FC, useEffect } from 'react'
import withRoles from '../../hoc/withRoles'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { RolesEnum } from '../../models/user'
import { setIsDialog } from '../../redux/reducers/app'
import { useStyles } from '../../styles/classes'
import OmdbDialog from './Dialog/OmdbDialog'
import FilmsForReviewForm from './FilmsForReviewForm'
import OmdbFilmsList from './List/OmdbFilmsList'

const FilmsForReview: FC = () => {
    const classes = useStyles()

    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            dispatch(setIsDialog(false))
        }
    }, [])

    return (
        <Box className={classes.scrollBox}>
            <Container>
                <OmdbDialog />
                <FilmsForReviewForm />
                <OmdbFilmsList />
            </Container>
        </Box>
    )
}

export default withRoles(FilmsForReview, [RolesEnum.WRITER])
