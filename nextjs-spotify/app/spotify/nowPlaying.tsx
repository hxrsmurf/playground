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
    icon: <PlayIcon className='h-6 w-6 text-black' />,
    alt_icon: <PauseIcon className='h-6 w-6 text-black' />,
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


// https://stackoverflow.com/questions/66120513/property-does-not-exist-on-type-window-typeof-globalthis
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: any
    Spotify: any
  }
}

export default function nowPlaying() {
  const [player, setPlayer]: any = useState()
  const [progress, setProgress]: any = useState()
  const [duration, setDuration]: any = useState()
  const [elapsed, setElapsed]: any = useState()
  const [playback, setPlayback]: any = useState()
  const [cookies, setCookies]: any = useState()
  const [spotifyPlayer, setSpotifyPlayer]: any = useState()

  async function getPlayer() {
    const query = await fetch('/api/spotify/player')
    const resp = await query.json()

    try {
      const ms_progress = resp.data.progress_ms
      const ms_duration = resp.data.item.duration_ms
      const current_playback = resp.data.is_playing

      setPlayer(resp.data)
      setPlayback(current_playback)
      setProgress(millisToMinutesAndSeconds(ms_progress))
      setDuration(millisToMinutesAndSeconds(ms_duration))
      setElapsed((ms_progress / ms_duration) * 100)
    } catch {
      setPlayer('nothing')
    }
  }

  const updatePlayer = async (state: string) => {
    const query = await fetch('/api/spotify/player/' + state)
  }

  useEffect(() => {
    getPlayer()

    const cookieMonster = async () => {
      const query = await fetch('/api/spotify/me')
      const res = await query.json()
      setCookies(res.access_token)
    }

    cookieMonster()
    setInterval(getPlayer, 500)
  }, [])

  // https://github.com/spotify/spotify-web-playback-sdk-example/blob/main/src/WebPlayback.jsx
  // https://developer.spotify.com/documentation/web-playback-sdk/quick-start/
  useEffect(() => {
    if (cookies) {
      const access_token = cookies
      const script = document.createElement('script')
      script.src = 'https://sdk.scdn.co/spotify-player.js'
      script.async = true

      document.body.appendChild(script)

      window.onSpotifyWebPlaybackSDKReady = async () => {
        const _player = new window.Spotify.Player({
          name: 'Web Playback SDK Player',
          getOAuthToken: (cb:any ) => {
            cb(access_token)
          },
          volume: 0.5,
        })
        setSpotifyPlayer(_player)
        _player.connect()
      }
    }
  }, [cookies])

  const handlePlayPause = () => {
    setPlayback(!player.is_playing ? true : false)
    updatePlayer(!player.is_playing ? 'play' : 'pause')
  }

  if (!player) return <>Loading player...</>
  if (player == 'nothing') return <>Nothing playing</>
  if (!cookies) return <></>
  if (!spotifyPlayer) return <></>

  return (
    <div className='grid grid-cols-3'>
      <div className='grid grid-cols-3 max-w-[400px] ml-6'>
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

      <div className='grid grid-rows-2 min-w-[400px]'>
        <div className='grid grid-cols-5'>
          {play_states.map((state, id) => (
            <div
              key={id}
              className='flex items-center justify-center object-center'
            >
              {state.name == 'Play' ? (
                <div
                  className='bg-white rounded-lg p-2'
                  onClick={() => handlePlayPause()}
                >
                  {!playback ? <>{state.icon}</> : <>{state.alt_icon}</>}
                </div>
              ) : (
                <>{state.icon}</>
              )}
            </div>
          ))}
        </div>
        <div className='flex items-center object-center align-middle justify-center pt-4'>
          <div className='grid grid-flow-col space-x-2'>
            {progress ? (
              <>
                <div>{progress}</div>
                <div className='bg-[#5e5e5e] h-3 min-w-[400px] flex items-center align-middle mt-2 rounded-lg'>
                  <div
                    className='bg-white h-3 rounded-lg'
                    style={{ width: elapsed + '%' }}
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
