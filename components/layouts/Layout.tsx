import { FC } from 'react'
import { Navbar } from '../ui'
// import Head from 'next/head'

export const Layout: FC = ({ children }) => {
  return (
    <>
      {/* <Head></Head> */}
      <nav>
        <Navbar />
      </nav>
      <main style={{ padding: '20px 50px' }}>{children}</main>
    </>
  )
}
