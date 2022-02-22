import type { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react'
import Home from '../components/Home/Home'
import { ReviewApi } from '../http/review'
import { setReviews } from '../redux/reducers/reviews'
import wrapper from '../redux/store'

const HomePage: NextPage = () => {
    return (
        <>
            <Head>
                <title>IReview</title>
                <meta
                    name="description"
                    content="Film reviews web application with offline support"
                />
            </Head>
            <Home />
        </>
    )
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
