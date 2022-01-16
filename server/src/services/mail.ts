import { createTransport } from 'nodemailer'
import { Options } from 'nodemailer/lib/smtp-transport'

export const MailService = {
    transporter: createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    } as Options),
    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Account activation ${process.env.CLIENT_URL!.replace(
                'http://',
                ''
            )}`,
            html: `
            <h2>Please click on the link below to activate your account</h2>
            <a href='${link}'>${link}</a>
            `,
        })
    },
    async sendPasswordResetLink(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Reset password ${process.env.CLIENT_URL!.replace(
                'http://',
                ''
            )}`,
            html: `
            <h2>Please click on the link below to activate your account</h2>
            <a href='${link}'>${link}</a>
            `,
        })
    },
}
