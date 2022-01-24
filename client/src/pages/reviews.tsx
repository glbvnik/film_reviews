import React from 'react'
import Drawer from '../components/Drawer/Drawer'
import withRoles from '../hoc/withRoles'
import { RolesEnum } from '../models/user'

const Reviews = () => {
    return <Drawer />
}

export default withRoles(Reviews, [RolesEnum.WRITER, RolesEnum.EDITOR])
