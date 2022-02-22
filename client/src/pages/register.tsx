import type { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react'
import Form from '../components/Auth/Form/Form'

const Register: NextPage = () => {
    return (
        <>
            <Head>
                <title>Register</title>
                <meta name="description" content="Register page" />
            </Head>
            <Form />
        </>
    )
}

export default Register
