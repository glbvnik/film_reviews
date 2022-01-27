import createEmotionServer from '@emotion/server/create-instance'
import { ServerStyleSheets } from '@material-ui/core/styles'
import Document, {
    DocumentContext,
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document'
import * as React from 'react'
import { theme } from '../theme'
import { createEmotionCache } from '../utils/createEmotionCache'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const originalRenderPage = ctx.renderPage

        const cache = createEmotionCache()
        const { extractCriticalToChunks } = createEmotionServer(cache)

        const sheets = new ServerStyleSheets()

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App: any) => (props) =>
                    sheets.collect(<App emotionCache={cache} {...props} />),
            })

        const initialProps = await Document.getInitialProps(ctx)

        const emotionStyles = extractCriticalToChunks(initialProps.html)
        const emotionStyleTags = emotionStyles.styles.map((style) => (
            <style
                data-emotion={`${style.key} ${style.ids.join(' ')}`}
                key={style.key}
                dangerouslySetInnerHTML={{ __html: style.css }}
            />
        ))

        return {
            ...initialProps,
            styles: [
                ...emotionStyleTags,
                ...React.Children.toArray(initialProps.styles),
                sheets.getStyleElement(),
            ],
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta
                        name="theme-color"
                        content={theme.palette.primary.main}
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
