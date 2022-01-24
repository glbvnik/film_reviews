import { NextPage } from 'next'
import React from 'react'
import Drawer from '../../components/Drawer/Drawer'
import withRoles from '../../hoc/withRoles'
import { RolesEnum } from '../../models/user'

const AdministrationSection: NextPage = () => {
    return <Drawer />
}

export default withRoles(AdministrationSection, [
    RolesEnum.ADMIN,
    RolesEnum.MODERATOR,
])
