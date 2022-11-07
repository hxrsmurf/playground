'use client'
import useSWR from 'swr'
import { useEffect, useState } from 'react'

export default function page() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const query = await fetch('http://localhost:3000/api/nowplaying')
      const data = await query.json()
      console.log(data)
      setData(data.access_token)
      setLoading(false)
    }
    getData()
  }, [])

  if (isLoading) return <>Loading...</>
  if (!data) return <>Loading data...</>

  return (
    <div className='bg-[#f1f5f8] text-black mt-12'>
      <div className='text-3xl flex justify-center py-28'>
        <div className='grid grid-cols-1 place-content-center space-y-8 text-center'>
          <div className='font-bold'>Now Playing</div>
          <div>Your access token is: {data}</div>
        </div>
      </div>
    </div>
  )
}
