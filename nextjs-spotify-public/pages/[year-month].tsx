import {
  dynamodb_get_tracks,
  redis_get_tracks,
} from '../components/database/get'
import { redis_update_tracks } from '../components/database/update'

export default function YearMonth(props: any) {
  const year_month_tracks = props.year_month_tracks

  if (!year_month_tracks) return <>Invalid Page</>

  return (
    <div className='flex justify-center mt-14'>
      <div className='grid grid-flow-row'>
        <div>Hello World</div>
      </div>
    </div>
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

  return {
    props: { year_month_tracks }, // will be passed to the page component as props
  }
}
