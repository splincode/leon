import Link from 'next/link'
import type { FunctionComponent } from 'react'

export interface HeaderProps {}

export const Header: FunctionComponent<HeaderProps> = ({ children, ...props }) => {
  return (
    <section className="header">
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
      {children}
    </section>
  )
}
