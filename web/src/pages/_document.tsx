import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document'
import { ReactElement } from 'react'

// eslint-disable-next-line functional/no-class
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <meta name="Description" content="HN custom client." />
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
