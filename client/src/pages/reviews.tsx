import Head from 'next/head'
import * as React from 'react'
import Drawer from '../components/Drawer/Drawer'
import withRoles from '../hoc/withRoles'
import { RolesEnum } from '../models/user'

const Reviews = () => {
    return (
        <>
            <Head>
                <title>Reviews</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <Drawer />
        </>
    )
}

export default withRoles(Reviews, [RolesEnum.WRITER, RolesEnum.EDITOR])
