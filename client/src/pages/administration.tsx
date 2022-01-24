import React from 'react'
import Drawer from '../components/Drawer/Drawer'
import withRoles from '../hoc/withRoles'
import { RolesEnum } from '../models/user'

const Administration = () => {
    return <Drawer />
}

export default withRoles(Administration, [RolesEnum.ADMIN, RolesEnum.MODERATOR])
