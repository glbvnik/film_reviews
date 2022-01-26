import type { NextPage } from 'next'
import Home from '../components/Home/Home'
import { ReviewApi } from '../http/review'
import { setReviews } from '../redux/reducers/reviews'
import wrapper from '../redux/store'

const HomePage: NextPage = () => {
    return <Home />
}

export default HomePage

export const getStaticProps = wrapper.getStaticProps(
    ({ dispatch }) =>
        async () => {
            const data = await ReviewApi.fetch()

            dispatch(setReviews(data))

            return { props: {}, revalidate: 15 }
        }
)
