import {
  dynamodb_get_tracks,
  redis_get_tracks,
} from '../components/database/get'
import { redis_update_tracks } from '../components/database/update'
import { top_artists } from '../utils/top'
import ChartArtists from './charts/top/artists'

export default function YearMonth(props: any) {
  const year_month = props.year_month
  const year_month_tracks = props.year_month_tracks
  const top_artists = props.artists

  if (!year_month_tracks) return <>Invalid Page</>

  return (
    <>
      <div className='flex justify-center mt-14'>
        <div className='grid grid-flow-row'>
          <div>Top 10 Artists - {year_month}</div>
          <div className='grid grid-flow-col my-4 font-bold'>
            <div className='min-w-[150px]'>Artist</div>
            <div>Count</div>
          </div>
          {Object.keys(top_artists).map((artist: string, id) => (
            <div key={id} className='grid grid-flow-col'>
              <div className='min-w-[150px]'>{artist}</div>
              <div>{top_artists[artist]}</div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-center mt-14'>
        <div className='min-h-[1200px] min-w-[1500px]'>
          <ChartArtists data={top_artists} year_month={year_month}/>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const year_month = context.query['year-month']
  let year_month_tracks = undefined

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

  const artists = top_artists(year_month_tracks)

  return {
    props: { year_month, year_month_tracks, artists }, // will be passed to the page component as props
  }
}
