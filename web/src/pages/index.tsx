import Head from 'next/head'
import { ReactElement } from 'react'
import ListPostContainer from '../containers/ListPostContainer'

export default function Home(): ReactElement {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ListPostContainer />
    </>
  )
}
