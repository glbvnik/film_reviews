import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Loader from '../../components/Loaders/Loader'
import Review from '../../components/Review/Review'
import { ReviewApi } from '../../http/review'
import { setCurrentReview } from '../../redux/reducers/reviews'
import wrapper from '../../redux/store'

const ReviewPage: NextPage = () => {
    const router = useRouter()

    if (router.isFallback) {
        return <Loader />
    }

    return <Review />
}

export default ReviewPage

export const getServerSideProps = wrapper.getServerSideProps(
    ({ dispatch }) =>
        async ({ params, req }) => {
            const data = await ReviewApi.fetchOne(
                +params!.id!,
                req.cookies.refreshToken
            )

            dispatch(setCurrentReview(data))

            return { props: {} }
        }
)
