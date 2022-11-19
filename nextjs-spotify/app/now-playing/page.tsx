'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function page() {
  const [playing, setPlaying]: any = useState()

  useEffect(() => {
    const fetchPlayer = async () => {
      const query = await fetch('/api/spotify/player')
      const result = await query.json()
      setPlaying(result.data)
    }
    fetchPlayer()
  }, [])

  if (!playing)
    return (
      <>
        <div className='flex justify-center mt-8'>Loading now playing...</div>
      </>
    )

  if (playing == 'none') {
    return <>Nothing playing.</>
  }

  return (
    <div className='flex justify-center mt-8'>
      <div className='grid grid-flow-row'>
        <div className='grid grid-cols-2 space-x-6'>
          <div>
            <Image
              src={playing.item.album.images[0].url}
              height={250}
              width={250}
              alt=''
            />
          </div>
          <div className='grid grid-rows-2'>
            <div className='flex items-center'>{playing.item.name}</div>
            <div className='flex items-center'>
              {playing.item.artists[0].name}
            </div>
          </div>
        </div>
        <div className='grid grid-flow-row mt-8'>
          <div className='grid grid-flow-col'>
            <div>Context: </div>
            <div>
              <Link
                className='hover:bg-yellow-400'
                href={playing.context.external_urls.spotify}
              >
                {playing.context.type}
              </Link>
            </div>
          </div>
          <div className='grid grid-flow-col'>
            <div>Device: </div>
            <div>{playing.device.type}</div>
          </div>
          <div className='grid grid-flow-col'>
            <div>Shuffle: </div>
            <div>{playing.shuffle_state ? 'on' : 'off'}</div>
          </div>

          <div className='grid grid-flow-col'>
            <div>Repeat: </div>
            <div>{playing.repeat_state}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
