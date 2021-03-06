import { GetStaticPaths, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'
import Home from '../components/Home/Home'
import Loader from '../components/UI/Loader'
import { ReviewApi } from '../http/review'
import { setReviews } from '../redux/reducers/reviews'
import wrapper from '../redux/store'

const Page: NextPage = () => {
    const router = useRouter()

    if (router.isFallback) {
        return <Loader />
    }

    return (
        <>
            <Head>
                <title>IReview</title>
                <meta
                    name="description"
                    content="Film reviews web application with offline support"
                />
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <Home />
        </>
    )
}

export default Page

export const getStaticProps = wrapper.getStaticProps(
    ({ dispatch }) =>
        async ({ params }) => {
            try {
                const data = await ReviewApi.fetch({
                    limit: 20,
                    offset: (+params!.page! - 1) * 20,
                })

                if (data.reviews.length === 0) {
                    return {
                        notFound: true,
                    }
                }

                dispatch(setReviews(data))

                return { props: {}, revalidate: 15 }
            } catch (e) {
                return {
                    notFound: true,
                }
            }
        }
)

export const getStaticPaths: GetStaticPaths<{ page: string }> = async () => {
    const count = await ReviewApi.count()

    const paths = Array(Math.ceil(count / 20))
        .fill(undefined)
        .map((_, index) => ({
            params: {
                page: (index + 1).toString(),
            },
        }))

    return {
        paths,
        fallback: true,
    }
}
