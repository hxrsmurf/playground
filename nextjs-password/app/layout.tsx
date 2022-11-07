import SessionProvider from '../contexts/SessionProvider'
import { headers } from 'next/headers'
import { getSession } from '../lib/session'
import './globals.css'
import Footer from './main/footer'
import Navigation from './navigation'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
  props?: any
}) {
  const session = await getSession(headers().get('cookie') ?? '')
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <SessionProvider session={session}>
          <Navigation />
          <Footer />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
