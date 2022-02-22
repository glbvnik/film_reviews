import { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react'
import Form from '../../components/Auth/Form/Form'

const PasswordReset: NextPage = () => {
    return (
        <>
            <Head>
                <title>Forgot password</title>
                <meta name="description" content="Reset password" />
            </Head>
            <Form />
        </>
    )
}

export default PasswordReset
