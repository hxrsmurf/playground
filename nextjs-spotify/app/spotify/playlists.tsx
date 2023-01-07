'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function playlists() {
  const [playlists, setPlaylists]: any = useState()

  useEffect(() => {
    const getPlaylists = async () => {
      const req = await fetch('/api/spotify/playlist')
      const res = await req.json()
      setPlaylists(res.data.items)
    }
    getPlaylists()
  })

  if (!playlists) return <></>

  return (
    <div className='grid grid-flow-row text-[#b3b3b3] max-w-[200px]'>
      {playlists.map((playlist: any, id: any) => (
        <div
          key={id}
          className='hover:text-white
        cursor-default
        whitespace-nowrap
        overflow-hidden
        overflow-ellipsis
        mt-2
        '
        >
          <Link href={'/spotify/playlist/' + playlist.id}>{playlist.name}</Link>
        </div>
      ))}
    </div>
  )
}
