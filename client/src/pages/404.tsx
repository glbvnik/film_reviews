import type { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react'
import StateMessage from '../components/UI/StateMessage'

const Custom404: NextPage = () => {
    return (
        <>
            <Head>
                <title>404</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <StateMessage state="404" />
        </>
    )
}

export default Custom404
