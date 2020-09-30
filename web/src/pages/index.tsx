import Head from 'next/head'
import { ReactElement } from 'react'
import ListPostContainer from '../containers/ListPostContainer'
import Header from '../components/Header'

export default function Home(): ReactElement {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <Header title="HN Feed" subtitle="We <3 hacker news!" />
      <ListPostContainer />
    </>
  )
}
