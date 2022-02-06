import { CacheProvider, EmotionCache } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { authSelectors } from '../redux/reducers/auth'
import { refresh } from '../redux/reducers/auth/action-creators'
import wrapper from '../redux/store'
import '../styles/globals.css'
import { theme } from '../theme'
import { createEmotionCache } from '../utils/createEmotionCache'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache
}

function MyApp({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
}: MyAppProps) {
    const isLoggedOut = useAppSelector(authSelectors.isLoggedOut)

    const dispatch = useAppDispatch()

    const router = useRouter()

    useEffect(() => {
        dispatch(refresh())
    }, [])

    useEffect(() => {
        if (isLoggedOut) {
            router.push(process.env.NEXT_PUBLIC_LOGIN_ROUTE!)
        }
    }, [isLoggedOut])

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
