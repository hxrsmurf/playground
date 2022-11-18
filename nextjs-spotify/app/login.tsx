'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function login({ cookies }: any) {
  const router = useRouter()
  const [link, setLink]: any = useState()
  const [showLogin, setShowLogin]: any = useState(true)
  const [logout, setLogout]: any = useState(false)

  useEffect(() => {
    const generateSpotifyLink = async () => {
      const query = await fetch('/api/auth/generateSpotifyLink')
      const result = await query.json()
      const link = result.link
      setLink(link)
    }

    if (cookies.access_token && !logout) {
      setShowLogin(false)
      setLogout(false)
    } else {
      setShowLogin(true)
      generateSpotifyLink()
    }
  }, [logout])

  const handleClick = () => {
    setLink(null)
    setLogout(true)
    router.push('/api/auth/logout')
  }

  if (!showLogin)
    return (
      <>
        <div
          className='hover:bg-yellow-400 hover:cursor-pointer'
          onClick={() => handleClick()}
        >
          Logout
        </div>
      </>
    )

  if (!link) return <></>

  return (
    <>
      <Link href={link} className='hover:bg-yellow-400 hover:cursor-pointer'>
        Login
      </Link>
    </>
  )
}
