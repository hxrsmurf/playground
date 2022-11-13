'use client'

import { useEffect, useState } from 'react'
import Sidebar from './sidebar'
import Tracks from './tracks'

export default function page() {
  const [profile, setProfile]: any = useState()
  const [tracks, setTracks]: any = useState()

  useEffect(() => {
    const getProfile = async () => {
      const query = await fetch('http://localhost:3000/api/spotify/me')
      const result = await query.json()
      setProfile(result)
    }
    getProfile()
  }, [])

  if (!profile) return <>Loading...</>
  return (
    <>
      <div className='fixed'>
        <Sidebar setTracks={setTracks} />
      </div>
      <div className='flex justify-center ml-96'>
        <div>
          <div>{tracks ? <Tracks id={tracks} /> : <></>}</div>
        </div>
      </div>
    </>
  )
}
