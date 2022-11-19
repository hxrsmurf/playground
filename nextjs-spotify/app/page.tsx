'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

async function getSpotifyLink() {
  const res = await fetch('/api/auth/generateSpotifyLink')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default function Home() {
  const [spotify_link, setSpotifyLink]: any = useState()

  useEffect(() => {
    const generateLink = async () => {
      const resp = await getSpotifyLink()
      setSpotifyLink(resp)
    }
    generateLink()
  }, [])

  if (!spotify_link) return <></>

  return (
    <div className='flex justify-center color:white'>
      <Link href={spotify_link.link}>Login to Spotify</Link>
    </div>
  )
}
