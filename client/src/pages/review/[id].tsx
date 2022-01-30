import { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
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

export const getStaticProps = wrapper.getStaticProps(
    ({ dispatch }) =>
        async ({ params }) => {
            try {
                const data = await ReviewApi.fetchOne(+params!.id!)

                dispatch(setCurrentReview(data))

                return { props: {}, revalidate: 15 }
            } catch (e) {
                return {
                    notFound: true,
                }
            }
        }
)

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
    const count = await ReviewApi.count()

    const paths = Array(count)
        .fill(undefined)
        .map((_, index) => ({
            params: {
                id: (index + 1).toString(),
            },
        }))

    return {
        paths,
        fallback: true,
    }
}
