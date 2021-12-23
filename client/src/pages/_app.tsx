import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { refresh } from '../redux/reducers/auth/action-creators'
import wrapper from '../redux/store'
import '../styles/globals.css'
import { theme } from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(refresh())
    }, [])

    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, maximum-scale=1'
                />
            </Head>

            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    )
}

export default wrapper.withRedux(MyApp)
