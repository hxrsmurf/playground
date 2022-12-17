import {
  dynamodb_get_tracks,
  redis_get_tracks,
} from '../components/database/get'
import { redis_update_tracks } from '../components/database/update'
import MonthNotAvailable from '../components/MonthNotAvailable'
import TopHeader from '../components/TopHeader'
import { available_dates } from '../utils/dates'
import { top_artists } from '../utils/top'
import ChartArtists from './charts/top/artists'

export default function YearMonth(props: any) {
  const year_month = props.year_month
  const available_months = available_dates().months

  if (!available_months.includes(year_month)) {
    return <MonthNotAvailable month={year_month} />
  }

  const year_month_tracks = props.year_month_tracks
  const top_artists = props.artists
  const top_tracks = props.tracks
  const top_devices = props.devices

  if (!year_month_tracks) return <>Invalid Page</>

  return (
    <>
      <div className='flex justify-center mt-8 min-w-[800px]'>
        <div className='grid grid-flow-col divide-x-2 gap-6'>
          {/* Artists */}
          <div>
            <TopHeader type='Artists' year_month={year_month} />
            {Object.keys(top_artists).map((artist: string, id) => (
              <div key={id} className='grid grid-flow-col'>
                <div className='min-w-[250px]'>{artist}</div>
                <div>{top_artists[artist]}</div>
              </div>
            ))}
          </div>

          {/* Tracks */}
          <div className='pl-6'>
            <TopHeader type='Tracks' year_month={year_month} />
            {Object.keys(top_tracks).map((track: string, id) => (
              <div key={id} className='grid grid-flow-col space-x-4'>
                <div className='min-w-[250px] max-w-[250px] text-clip overflow-hidden whitespace-nowrap'>
                  {track}
                </div>
                <div>{top_tracks[track]}</div>
              </div>
            ))}
          </div>

          {/* Devices */}
          <div className='pl-6'>
            <TopHeader type='Devices' year_month={year_month} />
            {Object.keys(top_devices).map((device: string, id) => (
              <div key={id} className='grid grid-flow-col space-x-4'>
                <div className='min-w-[250px] max-w-[250px] text-clip overflow-hidden whitespace-nowrap'>
                  {device}
                </div>
                <div>{top_devices[device]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='flex justify-center mt-14 min-w-[800px]'>
        <div className='grid grid-flow-col space-x-4 col-span-2'>
          <div className='min-w-[700px]'>
            <ChartArtists
              data={top_artists}
              year_month={year_month}
              type='Artists'
            />
          </div>
          <div className='min-w-[700px]'>
            <ChartArtists
              data={top_tracks}
              year_month={year_month}
              type='Tracks'
            />
          </div>
          <div className='min-w-[700px] max-h-[400px]'>
            <ChartArtists
              data={top_devices}
              year_month={year_month}
              type='Devices'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const available_months = available_dates().months

  const paths = available_months.map((month: any) => ({
    params: {
      'year-month': month,
    },
  }))

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps(context: any) {
  const year_month = context.params['year-month']
  // getServerSideProps
  // const year_month = context.query['year-month']

  // Catch if someone inputs the wrong date
  if (year_month.length != 7) {
    return {
      props: {
        year_month: year_month,
      },
    }
  }

  let year_month_tracks = null

  year_month_tracks = await redis_get_tracks(year_month)

  if (!year_month_tracks) {
    console.log('Querying Dynamo')
    year_month_tracks = await dynamodb_get_tracks(year_month)
    const result_update = await redis_update_tracks(
      year_month,
      year_month_tracks
    )
    console.log('Update to Redis:', result_update)
  } else {
    console.log('Using Redis')
  }

  const artists = top_artists(year_month_tracks).artists
  const tracks = top_artists(year_month_tracks).output_tracks
  const devices = top_artists(year_month_tracks).output_devices

  return {
    props: { year_month, year_month_tracks, artists, tracks, devices }, // will be passed to the page component as props
  }
}
