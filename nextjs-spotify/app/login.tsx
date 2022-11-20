'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function login({ cookies }: any) {
  const [link, setLink]: any = useState()

  useEffect(() => {
    const generateSpotifyLink = async () => {
      const query = await fetch('/api/auth/generateSpotifyLink')
      const result = await query.json()
      setLink(result.link)
    }
    generateSpotifyLink()
  }, [])

  if (!link) return <></>

  return (
    <Link href={link} className='hover:cursor-pointer'>
      Login
    </Link>
  )
}
