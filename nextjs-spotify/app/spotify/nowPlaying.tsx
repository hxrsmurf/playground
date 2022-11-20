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
import { millisToMinutesAndSeconds } from '../../utils/conversions'

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
  const [progress, setProgress]: any = useState()
  const [duration, setDuration]: any = useState()
  const [elapsed, setElapsed]: any = useState()

  useEffect(() => {
    const getPlayer = async () => {
      const query = await fetch('/api/spotify/player')
      const resp = await query.json()
      const ms_progress = resp.data.progress_ms
      const ms_duration = resp.data.item.duration_ms
      setPlayer(resp.data)
      setProgress(millisToMinutesAndSeconds(ms_progress))
      setDuration(millisToMinutesAndSeconds(ms_duration))
      setElapsed((ms_progress / ms_duration) * 100)
    }
    getPlayer()
    setInterval(getPlayer, 500)
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

      <div className='grid grid-rows-2'>
        <div className='grid grid-cols-5 max-w-[400px] ml-8'>
          {play_states.map((state, id) => (
            <div key={id} className='flex items-center justify-center object-center'>
              {state.name == 'Play' ? (
                <>
                  {!player.is_playing ? (
                    <>{state.icon}</>
                  ) : (
                    <>{state.alt_icon}</>
                  )}
                </>
              ) : (
                <>{state.icon}</>
              )}
            </div>
          ))}
        </div>
        <div className='flex items-center object-center'>
          <div className='grid grid-flow-col space-x-4'>
            {progress ? (
              <>
                <div>{progress}</div>
                <div className='bg-[#5e5e5e] h-3 min-w-[400px] flex items-center align-middle mt-2 rounded-lg'>
                  <div
                    className='bg-white h-3 rounded-lg'
                    style={{ width: elapsed }}
                  ></div>
                </div>
                <div>{duration}</div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
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
