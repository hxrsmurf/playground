'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import PlayIcon from '@heroicons/react/24/solid/PlayIcon'
import BackwardIcon from '@heroicons/react/24/solid/BackwardIcon'
import ForwardIcon from '@heroicons/react/24/solid/ForwardIcon'
import ArrowPath from '@heroicons/react/24/solid/ArrowPathIcon'
import ArrowPathRounded from '@heroicons/react/24/solid/ArrowPathRoundedSquareIcon'

const play_states = [
  {
    name: 'Shuffle',
    icon: <ArrowPathRounded className='h-6 w-6' />,
  },
  {
    name: 'Back',
    icon: <BackwardIcon className='h-6 w-6' />,
  },
  {
    name: 'Play',
    icon: <PlayIcon className='h-6 w-6' />,
  },
  {
    name: 'Forward',
    icon: <ForwardIcon className='h-6 w-6' />,
  },
  {
    name: 'Repeat',
    icon: <ArrowPath className='h-6 w-6' />,
  },
]

export default function nowPlaying() {
  const [player, setPlayer]: any = useState()
  useEffect(() => {
    const getPlayer = async () => {
      const query = await fetch('/api/spotify/player')
      const resp = await query.json()
      setPlayer(resp.data)
    }
    getPlayer()
  }, [])

  if (!player) return <>Loading player...</>

  return (
    <div className='grid grid-cols-3'>
      <div className='grid grid-cols-3 max-w-[400px] space-x-4 ml-4'>
        {player.item ? (
          <>
            <div>
              <Image
                src={player.item.album.images[0].url}
                width={75}
                height={75}
                alt=''
              />
            </div>
            <div className='grid grid-rows-2'>
              <div className='font-bold'>{player.item.name}</div>
              <div className='text-[#b3b3b3]'>
                {player.item.artists[0].name}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className='grid grid-cols-5 max-w-[400px]'>
        {play_states.map((state, id) => (
          <div key={id}>{state.icon}</div>
        ))}
      </div>
      <div className='grid grid-cols-3'>
        <div>Queue</div>
        <div>Device</div>
        <div>Volume</div>
      </div>
    </div>
  )
}
