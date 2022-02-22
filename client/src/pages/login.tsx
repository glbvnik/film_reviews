import type { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react'
import Form from '../components/Auth/Form/Form'

const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login page" />
            </Head>
            <Form />
        </>
    )
}

export default Login
