import { redis_get_tracks } from '../components/database/get'
import { redis_update_tracks } from '../components/database/update'
import TopHeader from '../components/TopHeader'
import { available_dates } from '../utils/dates'
import { top_artists } from '../utils/top'
import ChartArtists from './charts/top/artists'

export default function Page({
  available_months,
  available_year,
  artists,
  tracks,
  devices,
}: any) {
  const showNoteDetails = () => {
    const div = document.getElementById('note-details')!
    div.style.display = 'block'
  }
  const hideNoteDetails = () => {
    const div = document.getElementById('note-details')!
    div.style.display = 'none'
  }

  return (
    <>
      <div className='flex justify-center mt-4'>
        <div className='max-w-[1000px]'>
          <div className='font-bold cursor-pointer' onClick={()=> {showNoteDetails()}}>Notes</div>
          <div id='note-details' className='space-y-4 hidden'>
            <div onClick={()=> {hideNoteDetails()}} className='cursor-pointer'>
              Hide
            </div>
            <div>
              Accuracy - Unfortunately, these stats are not 100% accurate. This
              is because I added additional fields mid-way through the year. So,
              data without these additional fields may not be added to its
              corresponding metric. For example, the tracks is wildly
              inaccurate. With that said, the artists and devices are fairly
              accurate.
            </div>
            <div>
              Spotify tends to repeatedly play "liked" tracks, so that track may
              have a higher play count than expected. For example, while "That's
              Hilarious" by Charlie Puth was played a lot, Spotify tended to
              play it "extra".
            </div>
            <div>
              Motivation - I wanted to have my own "Spotify Wrapped" and learn
              more about React, Python, Redis, and DynamoDB.
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-8 min-w-[800px]'>
        <div className='grid grid-flow-col divide-x-2 gap-6'>
          {/* Artists */}
          <div>
            <TopHeader type='Artists' year_month={available_year} />
            {Object.keys(artists).map((artist: string, id) => (
              <div key={id} className='grid grid-flow-col'>
                <div className='min-w-[250px]'>{artist}</div>
                <div>{artists[artist]}</div>
              </div>
            ))}
          </div>

          {/* Tracks */}
          <div className='pl-6'>
            <TopHeader type='Tracks' year_month={available_year} />
            {Object.keys(tracks).map((track: string, id) => (
              <div key={id} className='grid grid-flow-col space-x-4'>
                <div className='min-w-[250px] max-w-[250px] text-clip overflow-hidden whitespace-nowrap'>
                  {track}
                </div>
                <div>{tracks[track]}</div>
              </div>
            ))}
          </div>

          {/* Devices */}
          <div className='pl-6'>
            <TopHeader type='Devices' year_month={available_year} />
            {Object.keys(devices).map((device: string, id) => (
              <div key={id} className='grid grid-flow-col space-x-4'>
                <div className='min-w-[250px] max-w-[250px] text-clip overflow-hidden whitespace-nowrap'>
                  {device}
                </div>
                <div>{devices[device]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='flex justify-center mt-14 min-w-[800px]'>
        <div className='grid grid-flow-col space-x-4 col-span-2'>
          <div className='min-w-[700px]'>
            <ChartArtists
              data={artists}
              year_month={available_year}
              type='Artists'
            />
          </div>
          <div className='min-w-[700px]'>
            <ChartArtists
              data={tracks}
              year_month={available_year}
              type='Tracks'
            />
          </div>
          <div className='min-w-[700px] max-h-[400px]'>
            <ChartArtists
              data={devices}
              year_month={available_year}
              type='Devices'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps(context: any) {
  const available_months = available_dates().months
  const available_year = String(available_dates().year)

  // https://stackoverflow.com/questions/31413749/node-js-promise-all-and-foreach

  let all_year_tracks = null

  all_year_tracks = await redis_get_tracks(available_year)

  if (!all_year_tracks) {
    const actions = available_months.map((month: string) => {
      return redis_get_tracks(month)
    })
    all_year_tracks = await Promise.all(actions)
    await redis_update_tracks(available_year, all_year_tracks)
    console.log('Updating Redis')
  } else {
    console.log('Using Redis')
  }

  const combined_year_tracks: any = []
  all_year_tracks.map((tracks: any) => {
    tracks.map((t: any) => {
      combined_year_tracks.push(t)
    })
  })

  const artists = top_artists(combined_year_tracks).artists
  const tracks = top_artists(combined_year_tracks).output_tracks
  const devices = top_artists(combined_year_tracks).output_devices

  return {
    props: {
      available_months,
      available_year,
      artists,
      tracks,
      devices,
    },
  }
}
