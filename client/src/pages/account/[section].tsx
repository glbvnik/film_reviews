import { NextPage } from 'next'
import React from 'react'
import Drawer from '../../components/Drawer/Drawer'
import withRoles from '../../hoc/withRoles'

const AccountSection: NextPage = () => {
    return <Drawer />
}

export default withRoles(AccountSection)
