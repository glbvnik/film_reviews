import { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react'
import Drawer from '../../../components/Drawer/Drawer'
import withRoles from '../../../hoc/withRoles'
import { RolesEnum } from '../../../models/user'

const UpdateReview: NextPage = () => {
    return (
        <>
            <Head>
                <title>Update review</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <Drawer />
        </>
    )
}

export default withRoles(UpdateReview, [RolesEnum.WRITER, RolesEnum.EDITOR])
