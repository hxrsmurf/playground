'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const time_ranges = [
  {
    name: 'Short Term',
    description: '(4-weeks)',
    id: 'short_term',
  },
  {
    name: 'Medium Term',
    description: '(6-months)',
    id: 'medium_term',
  },
  {
    name: 'Long Term',
    description: '(Several Years)',
    id: 'long_term',
  },
]

export default function top({ type }: any) {
  const [top, setTop]: any = useState()
  const [range, setRange]: any = useState('short_term')
  const [clickedType, setClickedType]: any = useState()
  const [loading, setLoading]: any = useState()

  const handleClick = (e: any) => {
    const type = e.target.id
    setLoading(true)
    setTop(undefined)
    setRange(type)
  }

  useEffect(() => {
    const fetchTop = async () => {
      const query = await fetch(
        '/api/spotify/top/' + type + '?time_range=' + range
      )
      const results = await query.json()
      setTop(results.data)
      setClickedType(type)
    }
    fetchTop()
    setLoading(false)
  }, [range, type, clickedType, loading])

  if (!top) return <>Loading top...</>

  return (
    <div className='grid grid-flow-row auto-rows-max justify-center space-y-10'>
      <div className='grid-cols-3 flex justify-center space-x-10'>
        {time_ranges.map((range, id) => (
          <div
            key={id}
            id={range.id}
            className='hover:bg-yellow-400 cursor-pointer'
            onClick={(e) => handleClick(e)}
          >
            {range.name} - {range.description}
          </div>
        ))}
      </div>
      <div>
        {!top ? (
          <>Loading top {range}</>
        ) : (
          <>
            <div className='flex justify-center mb-10'>
              Top {range} for {type}
            </div>
            {clickedType == 'tracks' ? (
              <>
                <div className='grid grid-cols-4 space-x-2 text-2xl font-bold underline'>
                  <div>Album Cover</div>
                  <div>Album</div>
                  <div>Track</div>
                  <div>Artist</div>
                </div>
                <div className='grid grid-cols-4 space-x-4'>
                  {top.map((item: any, id: any) => (
                    <>
                      <div className='my-4 max-w-[175px]' key={id}>
                        <Image
                          src={item.album.images[0].url}
                          width={150}
                          height={150}
                          alt=''
                        />
                      </div>
                      <div className='flex items-center'>{item.album.name}</div>
                      <div className='flex items-center'>{item.name}</div>
                      <div className='flex items-center'>
                        {item.artists[0].name}
                      </div>
                    </>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className='grid grid-cols-2 space-x-2'>
                  {top.map((item: any, id: any) => (
                    <>
                      <div className='my-4' key={id}>
                        <Image
                          src={item.images[0].url}
                          width={150}
                          height={150}
                          alt=''
                        />
                      </div>
                      <div className='flex items-center'>{item.name}</div>
                    </>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
