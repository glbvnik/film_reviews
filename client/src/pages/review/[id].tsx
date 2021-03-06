import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'
import Review from '../../components/Review/Review'
import Loader from '../../components/UI/Loader'
import { useAppSelector } from '../../hooks/useAppSelector'
import { ReviewApi } from '../../http/review'
import {
    reviewsSelectors,
    setCurrentReview,
} from '../../redux/reducers/reviews'
import wrapper from '../../redux/store'

interface ReviewPageProps {
    isUser: boolean
}

const ReviewPage: NextPage<ReviewPageProps> = ({ isUser }) => {
    const { film, author } = useAppSelector(reviewsSelectors.currentReview)!

    const router = useRouter()

    if (router.isFallback) {
        return <Loader />
    }

    return (
        <>
            <Head>
                <title>{`${author.lastName} - ${film.name}`}</title>
                <meta
                    name="description"
                    content={`Review on ${film.name} by ${author.firstName} ${author.lastName}`}
                />
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <Review isUser={isUser} />
        </>
    )
}

export default ReviewPage

export const getServerSideProps = wrapper.getServerSideProps(
    ({ dispatch }) =>
        async ({ params, req }) => {
            try {
                const refreshToken = req.cookies.refreshToken

                const data = await ReviewApi.fetchOne(
                    +params!.id!,
                    refreshToken
                )

                dispatch(setCurrentReview(data))

                return { props: { isUser: !!refreshToken } }
            } catch (e) {
                return { notFound: true }
            }
        }
)
