'use client'
import { useEffect, useState } from 'react'

var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi()

export default function page() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [profile, setProfile]: any = useState()

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const query = await fetch('http://localhost:3000/api/nowplaying')
      const data = await query.json()
      setData(data.access_token)
    }
    getData()
    setLoading(false)
  }, [])

  useEffect(() => {
    if (data) {
      spotifyApi.setAccessToken(data)
      spotifyApi.getMe().then((me: { body: any }) => {
        setProfile(me.body)
      })
    }
  }, [data])

  if (isLoading) return <>Loading...</>
  if (!data) return <>Loading data...</>
  if (!profile) return <>Loading profile...</>

  return (
    <div className='bg-[#f1f5f8] text-black mt-12'>
      <div className='text-3xl flex justify-center py-28'>
        <div className='grid grid-cols-1 place-content-center space-y-8 text-center'>
          <div className='font-bold'>Now Playing</div>
          <div>Your access token is: {data}</div>
          <div>Your name is probably: {profile.display_name} </div>
        </div>
      </div>
    </div>
  )
}
