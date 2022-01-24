import React, { ComponentType } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { RolesEnum } from '../models/user'
import Custom404 from '../pages/404'
import { selectAuth } from '../redux/reducers/auth'

const withRoles =
    (Component: ComponentType, roles: RolesEnum[] = [RolesEnum.USER]) =>
    () => {
        const { user, isRefreshLoading } = useAppSelector(selectAuth)

        if (isRefreshLoading) {
            return <></>
        }

        if (!roles.some((role) => user?.roles.includes(role))) {
            return <Custom404 />
        }

        return <Component />
    }

export default withRoles
