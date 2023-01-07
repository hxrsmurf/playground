import { useEffect, useState } from 'react'

export default function ListTracks() {
  const [data, setData]: any = useState()

  useEffect(() => {
    if (data) return

    fetch('/api/dynamodb/listTracks')
      .then((res) => res.json())
      .then((data) => {
        setData(data.data)
      })
  })

  if (!data) return <>Loading...</>

  return (
    <div className='flex justify-center mt-14'>
      <div>
        <div className='mb-4 grid-flow-col grid font-bold'>
          <div className='min-w-[300px] max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap'>Song</div>
          <div className='min-w-[300px] max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap'>Artist</div>
          <div className='min-w-[300px] max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap'>Album</div>
          <div className='min-w-[300px] max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap'>Epoch Time</div>
          <div className='min-w-[300px] max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap'>Device</div>
        </div>
        {data.map((d: any, id: any) => (
          <>
            {d.possibleDuplicate.BOOL ? (
              <></>
            ) : (
              <div key={id} className='grid grid-flow-col cols-5'>
                <div className='min-w-[300px] max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap'>
                  {d.song.S}
                </div>
                <div className='min-w-[300px] max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap'>
                  {d.artist.S}
                </div>
                <div className='min-w-[300px] max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap'>
                  {' '}
                  {d.album.S}
                </div>
                <div className='min-w-[300px] max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap'>
                  {d.epochTime.N}
                </div>
                <div className='min-w-[300px] max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap'>
                  {d.device.S}
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  )
}
