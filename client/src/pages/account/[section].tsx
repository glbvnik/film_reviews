import { NextPage } from 'next'
import React from 'react'
import Drawer from '../../components/Drawer/Drawer'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectAuth } from '../../redux/reducers/auth'
import Custom404 from '../404'

const AccountSection: NextPage = () => {
    const { user } = useAppSelector(selectAuth)

    if (!user || user.roles.length === 1) {
        return <Custom404 />
    }

    return <Drawer />
}

export default AccountSection
