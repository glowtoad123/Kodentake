import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
            <title>Codentake</title>
            <link rel="manifest" href="manifest.json" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="application-name" content="Codentake" />
            <meta name="apple-mobile-web-app-title" content="Codentake" />
            <meta name="theme-color" content="#2f3e46" />
            <meta name="msapplication-navbutton-color" content="#2f3e46" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="msapplication-starturl" content="/" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

            <link rel="icon"  sizes="512x512" href="/betalogo512.png" />
            <link rel="apple-touch-icon"  sizes="512x512" href="/betalogo512.png" />
            <link rel="icon"  sizes="144x144" href="/betalogo144.png" />
            <link rel="apple-touch-icon"  sizes="144x144" href="/betalogo144.png" />
            <link rel="icon"  sizes="192x192" href="/betalogo192.png" />
            <link rel="apple-touch-icon"  sizes="192x192" href="/betalogo192.png" />
            <link rel="stylesheet" href="./styles.css" />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument