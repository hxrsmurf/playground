'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function profile() {
  const [profile, setProfile]: any = useState()
  const [showSettings, setShowSettings]: any = useState()

  const [loading, setLoading]: any = useState(true)
  const [artists, setArtists]: any = useState()
  const [tracks, setTracks]: any = useState()

  const [range, setRange]: any = useState('short_term')

  useEffect(() => {
    const fetchProfile = async () => {
      const req = await fetch('/api/spotify/me')
      const res = await req.json()
      setProfile(res.profile)
    }
    fetchProfile()
  }, [])

  useEffect(() => {
    const fetchTop = async (type: string) => {
      var limit = null

      if (type == 'artists') {
        limit = 10
      } else {
        limit = 5
      }

      const query = await fetch(
        '/api/spotify/top/' + type + '?time_range=' + range + '&limit=' + limit
      )
      const results = await query.json()
      if (type == 'artists') {
        setArtists(results.data)
      } else {
        setTracks(results.data)
      }
    }
    fetchTop('artists')
    fetchTop('tracks')
    setLoading(false)
  }, [])

  if (!profile) return <></>
  if (!artists || !tracks) return <></>
  if (loading) return <></>

  return (
    <div className='col-span-2 mt-4'>
      <div className='grid grid-cols-3 items-center'>
        <div>
          <Image
            src={profile.images[0].url}
            height={230}
            width={230}
            alt=''
            style={{ borderRadius: '50%' }}
          />
        </div>

        <div className='grid grid-rows-3 ml-8 col-span-2'>
          <div>Profile</div>
          <div className='font-bold text-3xl'>{profile.display_name}</div>
          <div className='mt-4'>{profile.followers.total} Followers</div>
        </div>
      </div>

      <div>
        <div className='mt-32 text-2xl font-bold hover:underline'>
          <Link href='/top/artists'>Top artists this month</Link>
        </div>
        <div className='grid grid-flow-col space-x-7 items-center rounded-md mt-4'>
          {artists.map((artist: any, id: string) => (
            <div
              className='grid grid-flow-row bg-[#181818] p-8 w-[190px] h-[270px]'
              key={id}
            >
              <div>
                <Image
                  src={artist.images[0].url}
                  style={{ borderRadius: '50%' }}
                  width={150}
                  height={150}
                  alt=''
                />
              </div>
              <div className='text-center mt-4'>{artist.name}</div>
            </div>
          ))}
        </div>

        <div>
          <div className='mt-16 text-2xl font-bold hover:underline'>
            <Link href='/top/tracks'>Top tracks this month</Link>
          </div>
          <div className='mt-16'>
            {tracks.map((track: any, id: any) => (
              <div className='grid grid-cols-3 mt-4 space-x-10 w-screen'>
                <div className='grid grid-cols-6'>
                  <div className='flex items-center'>{id + 1}</div>
                  <div>
                    <Image
                      src={track.album.images[0].url}
                      height={100}
                      width={100}
                      alt=''
                    />
                  </div>
                  <div className='flex items-center ml-4'>
                    <div>
                      <div>{track.name}</div>
                      <div>{track.artists[0].name}</div>
                    </div>
                  </div>
                </div>

                <div className='flex items-center'>{track.album.name}</div>

                <div className='flex items-center'>
                  {/* https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript */}
                  {(track.duration_ms / 60000).toFixed(0)}:
                  {parseInt(((track.duration_ms % 60000) / 1000).toFixed(0)) >
                  10 ? (
                    <>{((track.duration_ms % 60000) / 1000).toFixed(0)}</>
                  ) : (
                    <>0{((track.duration_ms % 60000) / 1000).toFixed(0)}</>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
