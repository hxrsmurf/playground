'use client'

import { useEffect, useState } from 'react'

export default function albums() {
  const [albums, setAlbums]: any = useState()

  useEffect(() => {
    const getAlbums = async () => {
      const query = await fetch('/api/spotify/albums')
      const results = await query.json()
      console.log(results)
      setAlbums(results.message.items)
    }
    getAlbums()
  }, [])

  if (!albums) return <></>

  return (
    <div
      className='grid grid-flow-row text-[#b3b3b3]
    max-w-[200px]
    '
    >
      <div className='font-bold'>Albums</div>
      {albums.map((album: any, id: number) => (
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
          {album.album.name}
        </div>
      ))}
    </div>
  )
}
