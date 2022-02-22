import { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react'
import Drawer from '../../components/Drawer/Drawer'
import withRoles from '../../hoc/withRoles'
import { RolesEnum } from '../../models/user'

const AdministrationSection: NextPage = () => {
    return (
        <>
            <Head>
                <title>Administration</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <Drawer />
        </>
    )
}

export default withRoles(AdministrationSection, [
    RolesEnum.ADMIN,
    RolesEnum.MODERATOR,
])
