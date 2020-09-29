import Head from 'next/head'
import { ReactElement } from 'react'
import styles from '../styles/Home.module.css'

export default function Home(): ReactElement {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
