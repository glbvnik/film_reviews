import { FC, useEffect } from 'react'
import withRoles from '../../hoc/withRoles'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { RolesEnum } from '../../models/user'
import { setIsDialog } from '../../redux/reducers/app'
import Wrapper from '../UI/Wrapper'
import OmdbDialog from './Dialog/OmdbDialog'
import FilmsForReviewForm from './FilmsForReviewForm'
import OmdbFilmsList from './List/OmdbFilmsList'

const FilmsForReview: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            dispatch(setIsDialog(false))
        }
    }, [])

    return (
        <Wrapper isRelative>
            <OmdbDialog />
            <FilmsForReviewForm />
            <OmdbFilmsList />
        </Wrapper>
    )
}

export default withRoles(FilmsForReview, [RolesEnum.WRITER])
