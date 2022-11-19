'use client'

import { useEffect, useState } from 'react'

export default function playlists() {
  const [playlists, setPlaylists]: any = useState()

  useEffect(() => {
    const getPlaylists = async () => {
      const query = await fetch('/api/spotify/playlists')
      const results = await query.json()
      setPlaylists(results.message.items)
    }
    getPlaylists()
  }, [])

  if (!playlists) return <></>
  return (
    <div
      className='grid grid-flow-row text-[#b3b3b3]
    max-w-[200px]
    '
    >
      {playlists.map((playlist: any, id: number) => (
        <div
          className='hover:text-white
        cursor-default
        whitespace-nowrap
        overflow-hidden
        overflow-ellipsis
        mt-2
        '
        >
          {playlist.name}
        </div>
      ))}
    </div>
  )
}
