'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function tracks({ id }: any) {
  const [playlistInformation, setPlaylistInformation]: any = useState()
  const [playlistTracks, setPlaylistTracks]: any = useState()
  const [loading, setLoading]: any = useState(true)

  useEffect(() => {
    setLoading(true)
    const fetchPlaylistTracks = async () => {
      const query = await fetch(
        '/api/spotify/playlists/' + id
      )
      const result = await query.json()
      const data = result.message
      setPlaylistInformation({ name: data.name, image: data.images })
      setPlaylistTracks(data.tracks.items)
    }
    fetchPlaylistTracks()
    setLoading(false)
  }, [id])

  if (loading) return <>Loading playlist tracks...</>

  return (
    <div>
      <div>
        {!playlistInformation ? (
          <>Loading playlist tracks 2...</>
        ) : (
          <>
            <div className='grid grid-cols-2 max-w-[800px]'>
              <div>
                <Image
                  src={playlistInformation.image[0].url}
                  alt=''
                  width={300}
                  height={300}
                />
              </div>
              <div className='text-3xl'>{playlistInformation.name}</div>
            </div>
            <div className='mt-12'>
              <div className='grid-cols-3 grid font-bold'>
                <div>Title</div>
                <div>Album</div>
              </div>
              <div className='bg-blue-500 min-w-screen min-h-[8px]'></div>
              {playlistTracks.map((tracks: any) => (
                <>
                  <div className='grid-cols-3 grid my-4'>
                    <div className='grid-cols-3 flex'>
                      <div>
                        <Image
                          src={tracks.track.album.images[0].url}
                          width={50}
                          height={50}
                          alt=''
                        />
                      </div>
                      <div className='ml-4'>
                        <div>{tracks.track.name}</div>
                        <div>{tracks.track.artists[0].name}</div>
                      </div>
                    </div>
                    <div>{tracks.track.album.name}</div>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
