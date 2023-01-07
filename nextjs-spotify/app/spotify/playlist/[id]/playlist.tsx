import Image from 'next/image'
import React from 'react'

export default function playlist(data: any) {
  const playlist = data.data

  return (
    <div className='mt-4 col-span-2'>
      <div className='grid grid-flow-col auto-cols-auto'>
        <div>
          <Image src={playlist.images[0].url} width={150} height={150} alt='' />
        </div>
        <div className='col-span-2'>
          <div>Playlist</div>
          <div className='font-bold text-3xl'>{playlist.name}</div>
        </div>
      </div>

      <div className='mt-16'>
        {playlist.tracks.items.map((track: any, id: string) => (
          <div key={id} className='grid grid-flow-col auto-cols-auto my-8'>
            <div className='grid grid-cols-3 items-center'>
              <div>{id + 1}</div>
              <div className='col-span-2 inline-block justify-start'>
                <Image
                  src={track.track.album.images[0].url}
                  height={100}
                  width={100}
                  alt=''
                />
              </div>
            </div>

            <div className='grid grid-flow-row auto-rows-auto'>
              <div>{track.track.name}</div>
              <div>{track.track.artists[0].name}</div>
            </div>
            <div>{track.track.album.name}</div>
            <div>{track.track.duration_ms}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
