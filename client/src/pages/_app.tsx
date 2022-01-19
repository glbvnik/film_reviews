import { CacheProvider, EmotionCache } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { setUser } from '../redux/reducers/auth'
import { forkLogout } from '../redux/reducers/auth/action-creators'
import wrapper from '../redux/store'
import '../styles/globals.css'
import { theme } from '../theme'
import { createEmotionCache } from '../utils/createEmotionCache'
import { getCookie } from '../utils/getCookie'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache
}

function MyApp({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
}: MyAppProps) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const user = getCookie('user', true)

        if (user) {
            dispatch(setUser(user))
            dispatch(forkLogout())
        }

        window.onbeforeunload = () => {
            document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 GMT;'
        }
    }, [])

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </CacheProvider>
    )
}

export default wrapper.withRedux(MyApp)
