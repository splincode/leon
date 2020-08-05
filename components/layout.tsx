import Head from 'next/head'
import type { FunctionComponent } from 'react'
import { Header } from './header'

export interface LayoutProps {
  pageTitle: string
  preview?: boolean
  description?: string
}

export const Layout: FunctionComponent<LayoutProps> = ({ pageTitle, children, ...props }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <div className="container">
        <main className="content">{children}</main>
      </div>
    </>
  )
}
