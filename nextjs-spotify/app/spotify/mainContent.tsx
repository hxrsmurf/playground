'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function mainContent() {
  const [playlists, setPlaylists]: any = useState()
  const [profileInfo, setProfileInfo]: any = useState()

  useEffect(() => {
    const queryPlaylists = async () => {
      const res = await fetch('/api/spotify/playlists?limit=6')
      const resp = await res.json()
      setPlaylists(resp.message.items)
    }

    const queryMe = async () => {
      const res = await fetch('/api/spotify/me')
      const resp = await res.json()
      const profile = resp.profile
      setProfileInfo(profile)
    }
    queryPlaylists()
    queryMe()
  }, [])

  if (!playlists) return <>Loading playlists...</>
  if (!profileInfo) return <>Loading profile...</>

  return (
    <div className='w-screen'>
      <div className='font-bold text-2xl'>Hello {profileInfo.display_name}</div>
      <div className='grid grid-cols-3 mt-6 space-x-12 space-y-8'>
        {playlists.map((playlist: any, id: any) => (
          <div key={id} className='grid grid-cols-3 items-center min-w-[300px]'>
            <div>
              <Image
                src={playlist.images[0].url}
                height={100}
                width={100}
                alt=''
              />
            </div>
            <div className='col-span-2'>{playlist.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
