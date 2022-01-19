import { NextPage } from 'next'
import React from 'react'
import Dashboard from '../components/Dashboard/Dashboard'
import { useAppSelector } from '../hooks/useAppSelector'
import { selectAuth } from '../redux/reducers/auth'
import Custom404 from './404'

interface DashboardPageProps {
    isAccessible: boolean
}

const DashboardPage: NextPage<DashboardPageProps> = () => {
    const { user } = useAppSelector(selectAuth)

    if (!user || user.roles.length === 1) {
        return <Custom404 />
    }

    return <Dashboard />
}

export default DashboardPage
