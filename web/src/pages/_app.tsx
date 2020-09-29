import { ReactElement } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }): ReactElement {
  return <Component {...pageProps} />
}

export default MyApp
