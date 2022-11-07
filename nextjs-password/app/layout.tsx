import './globals.css'
import Features from './main/Features'
import First from './main/first'
import Footer from './main/footer'
import Navigation from './navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Navigation />
        <First />
        <Features />
        <Footer/>
      </body>
    </html>
  )
}
