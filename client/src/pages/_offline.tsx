import { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react'
import StateMessage from '../components/UI/StateMessage'

const Offline: NextPage = () => {
    return (
        <>
            <Head>
                <title>Offline</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <StateMessage state="offline" />
        </>
    )
}

export default Offline
