'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [spotifyLink, setSpotifyLink]: any = useState()

  useEffect(() => {
    const fetchSpotifyLink = async () => {
      const query = await fetch(
        '/api/auth/generateSpotifyLink'
      )
      const spotify_link = (await query.json()).link
      setSpotifyLink(spotify_link)
    }
    fetchSpotifyLink()
  })

  return (
    <div className='flex justify-center'>
      {!spotifyLink ? (
        <>Generating link...</>
      ) : (
        <>
          <Link href={spotifyLink}>Login</Link>
        </>
      )}
    </div>
  )
}
