'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function liked() {
  const [tracks, setTracks]: any = useState()
  const [items, setItems]: any = useState()

  useEffect(() => {
    const getTracks = async () => {
      const req = await fetch('/api/spotify/tracks')
      const res = await req.json()
      setTracks(res.tracks)
      setItems(res.tracks.items)
    }
    getTracks()
  }, [])

  if (!tracks) return <></>

  return (
    <div className='col-span-2 mt-4'>
      <div className='grid grid-cols-1 items-center'>
        <div className='grid grid-rows-3 ml-8 col-span-2'>
          <div>Playlist</div>
          <div className='font-bold text-3xl'>Liked Songs</div>
          <div className='mt-4'>{tracks.total} Songs</div>
        </div>
      </div>

      <div className='grid grid-flow-row mt-16'>
        {items.map((track: any, id: any) => (
          <div key={id} className='grid grid-cols-8 items-center w-screen'>
            <div className='grid grid-flow-col auto-cols-max items-center space-x-4 space-y-4'>
              <div>{id + 1}</div>
              <div className='col-span-2'>
                <Image
                  src={track.track.album.images[0].url}
                  width={100}
                  height={100}
                  alt=''
                />
              </div>
              <div className='grid grid-flow-row col-span-5'>
                <div>{track.track.name}</div>
                <div>{track.track.artists[0].name}</div>
              </div>
            </div>
            <div className='ml-[600px] col-span-2 min-w-[700px]'>{track.track.album.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
