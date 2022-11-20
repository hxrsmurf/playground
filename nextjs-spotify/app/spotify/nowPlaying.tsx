'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import PlayIcon from '@heroicons/react/24/solid/PlayIcon'
import PauseIcon from '@heroicons/react/24/solid/PauseIcon'
import BackwardIcon from '@heroicons/react/24/solid/BackwardIcon'
import ForwardIcon from '@heroicons/react/24/solid/ForwardIcon'
import ArrowPath from '@heroicons/react/24/solid/ArrowPathIcon'
import ArrowPathRounded from '@heroicons/react/24/solid/ArrowPathRoundedSquareIcon'
import RectangeStack from '@heroicons/react/24/solid/RectangleStackIcon'
import ComputerDesktop from '@heroicons/react/24/solid/ComputerDesktopIcon'
import SpeakerWave from '@heroicons/react/24/solid/SpeakerWaveIcon'

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
    alt_icon: <PauseIcon className='h-6 w-6' />,
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

const device_info = [
  {
    name: 'Queue',
    icon: <RectangeStack className='h-6 w-6' />,
  },
  {
    name: 'Device',
    icon: <ComputerDesktop className='h-6 w-6' />,
  },
  {
    name: 'Volume',
    icon: <SpeakerWave className='h-6 w-6' />,
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
      <div className='grid grid-cols-3 max-w-[400px] ml-4'>
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
            <div className='flex items-center min-w-[300px] '>
              <div>
                <div className='font-bold text-sm'>{player.item.name}</div>
                <div className='text-[#b3b3b3] text-sm'>
                  {player.item.artists[0].name}
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className='grid grid-cols-5 max-w-[400px]'>
        {play_states.map((state, id) => (
          <div key={id} className='flex items-center'>
            {state.name == 'Play' ? (
              <>
                {!player.is_playing ? <>{state.icon}</> : <>{state.alt_icon}</>}
              </>
            ) : (
              <>{state.icon}</>
            )}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-3'>
        {device_info.map((device: any, id: any) => (
          <div className='flex items-center justify-end mr-24'>
            {device.icon}
          </div>
        ))}
      </div>
    </div>
  )
}
