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
  const top_playlists = props.playlists

  if (!year_month_tracks) return <>Invalid Page</>

  return (
    <>
      <div className='flex justify-center mt-8'>
        <div className='grid grid-flow-row text-center'>
          {/* Playlists */}
          {Object.keys(top_playlists).length == 0 ? (
            <></>
          ) : (
            <div className='pt-8 pb-8'>
              <TopHeader type='Playlists' year_month={year_month} />
              {Object.keys(top_playlists).map((playlist: string, id) => (
                <div
                  key={id}
                  className='grid grid-flow-col text-center min-[1400px]:min-w-[400px] min-[1400px]:max-w-[400px] min-[1400px]:pl-44'
                >
                  <div className='min-w-[130px] max-w-[130px] text-clip overflow-hidden whitespace-nowrap'>
                    {playlist}
                  </div>
                  <div className='min-[1400px]:pl-44'>
                    {top_playlists[playlist]}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Playlists */}

          {/* Artists */}
          <div>
            <TopHeader type='Artists' year_month={year_month} clas />
          </div>
          {Object.keys(top_artists).map((artist: string, id) => (
            <div
              key={id}
              className='grid grid-flow-col text-center min-[1400px]:min-w-[400px] min-[1400px]:max-w-[400px] min-[1400px]:pl-44'
            >
              <div className='min-w-[130px] max-w-[130px] text-clip overflow-hidden whitespace-nowrap'>
                {artist}
              </div>
              <div className='min-[1400px]:pl-44'>{top_artists[artist]}</div>
            </div>
          ))}
          {/* Artists */}

          {/* Tracks */}
          <div className='pt-8'>
            <TopHeader type='Tracks' year_month={year_month} />
          </div>
          {Object.keys(top_tracks).map((track: string, id) => (
            <div
              key={id}
              className='grid grid-flow-col text-center min-[1400px]:min-w-[400px] min-[1400px]:max-w-[400px] min-[1400px]:pl-44'
            >
              <div className='min-w-[130px] max-w-[130px] text-clip overflow-hidden whitespace-nowrap'>
                {track}
              </div>
              <div className='min-[1400px]:pl-44'>{top_tracks[track]}</div>
            </div>
          ))}
          {/* Tracks */}

          {/* Devices */}
          <div className='pt-8 pb-8'>
            <TopHeader type='Devices' year_month={year_month} />
            {Object.keys(top_devices).map((device: string, id) => (
              <div
                key={id}
                className='grid grid-flow-col text-center min-[1400px]:min-w-[400px] min-[1400px]:max-w-[400px] min-[1400px]:pl-44'
              >
                <div className='min-w-[130px] max-w-[130px] text-clip overflow-hidden whitespace-nowrap'>
                  {device}
                </div>
                <div className='min-[1400px]:pl-44'>{top_devices[device]}</div>
              </div>
            ))}
          </div>
        {/* Devices */}
        </div>
        {/* Table */}

        <div>
          {/* Charts */}
          <div className='hidden min-[1400px]:flex min-[1400px]:visible min-[1400px]:justify-center ml-4'>
            <div className='min-w-[800px]'>
              {/* Chart Playlist */}
              {Object.keys(top_playlists).length == 0 ? (
                <></>
              ) : (
                <div>
                  <ChartArtists
                    data={top_playlists}
                    year_month={year_month}
                    type='Playlists'
                  />
                </div>
              )}
              {/* Chart Playlist */}

              {/* Chart Artists */}
              <div>
                <ChartArtists
                  data={top_artists}
                  year_month={year_month}
                  type='Artists'
                />
              </div>
              {/* Chart Artists */}

              {/* Chart Tracks */}
              <div>
                <ChartArtists
                  data={top_tracks}
                  year_month={year_month}
                  type='Tracks'
                />
              </div>
              {/* Chart Tracks */}

              {/* Chart Devices */}
              <div>
                <ChartArtists
                  data={top_devices}
                  year_month={year_month}
                  type='Devices'
                />
              </div>
              {/* Chart Devices */}
            </div>
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

  if (process.env.REDIS_HOST) {
    console.log(process.env.REDIS_HOST)
    year_month_tracks = await redis_get_tracks(year_month)
  }

  if (!year_month_tracks) {
    console.log('Querying Dynamo', year_month)

    year_month_tracks = await dynamodb_get_tracks(year_month)
    if (process.env.REDIS_HOST) {
      const result_update = await redis_update_tracks(
        year_month,
        year_month_tracks
      )
      console.log('Update to Redis:', result_update)
    }
  } else {
    console.log('Using Redis', year_month)
  }

  const artists = top_artists(year_month_tracks).artists
  const tracks = top_artists(year_month_tracks).output_tracks
  const devices = top_artists(year_month_tracks).output_devices
  const playlists = top_artists(year_month_tracks).output_playlist

  return {
    props: {
      year_month,
      year_month_tracks,
      artists,
      tracks,
      devices,
      playlists,
    }, // will be passed to the page component as props
  }
}