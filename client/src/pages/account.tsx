import { NextPage } from 'next'
import React from 'react'
import Drawer from '../components/Drawer/Drawer'
import { useAppSelector } from '../hooks/useAppSelector'
import { selectAuth } from '../redux/reducers/auth'
import Custom404 from './404'

const Account: NextPage = () => {
    const { user } = useAppSelector(selectAuth)

    if (!user) {
        return <Custom404 />
    }

    return <Drawer />
}

export default Account
