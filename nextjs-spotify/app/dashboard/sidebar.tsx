'use client'

import { useEffect, useState } from 'react'

export default function sidebar({ setTracks }: any) {
  const [playlists, setPlaylists]: any = useState()
  useEffect(() => {
    const getPlaylists = async () => {
      const query = await fetch('/api/spotify/playlists')
      const results = await query.json()
      setPlaylists(results.message.items)
      console.log(results.message.items)
    }
    getPlaylists()
  }, [])

  const handleClickPlaylist = (e: any) => {
    setTracks(e.target.id)
  }

  if (!playlists) return <>Loading Playlists...</>

  return (
    <div className='min-w-[100px] max-w-[250px] min-h-screen pl-6'>
      <div>Playlists</div>
      <ul>
        {playlists.map((playlist: any, id: any) => (
          <li
            key={id}
            id={playlist.id}
            className='cursor-pointer hover:bg-yellow-400 whitespace-nowrap overflow-hidden overflow-ellipsis hover:overflow-visible'
            onClick={(e) => handleClickPlaylist(e)}
          >
            {playlist.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
