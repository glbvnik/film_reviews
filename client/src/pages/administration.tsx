import React from 'react'
import Drawer from '../components/Drawer/Drawer'
import { useAppSelector } from '../hooks/useAppSelector'
import { RolesEnum } from '../models/user'
import { selectAuth } from '../redux/reducers/auth'
import Custom404 from './404'

const Administration = () => {
    const { user } = useAppSelector(selectAuth)

    if (
        !user ||
        (!user.roles.includes(RolesEnum.ADMIN) &&
            !user.roles.includes(RolesEnum.MODERATOR))
    ) {
        return <Custom404 />
    }

    return <Drawer />
}

export default Administration
