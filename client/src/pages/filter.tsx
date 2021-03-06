import { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react'
import Home from '../components/Home/Home'
import { ReviewApi } from '../http/review'
import { setReviews } from '../redux/reducers/reviews'
import wrapper from '../redux/store'

const Filter: NextPage = () => {
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

export default Filter

export const getServerSideProps = wrapper.getServerSideProps(
    ({ dispatch }) =>
        async ({ query }) => {
            const data = await ReviewApi.fetch({
                movie: query.movie as string,
                author: query.author as string,
                limit: 20,
                offset: (+query.page! - 1) * 20,
            })

            dispatch(setReviews(data))

            return { props: {} }
        }
)
