import { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react'
import Drawer from '../../components/Drawer/Drawer'
import withRoles from '../../hoc/withRoles'

const AccountSection: NextPage = () => {
    return (
        <>
            <Head>
                <title>Account</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <Drawer />
        </>
    )
}

export default withRoles(AccountSection)
