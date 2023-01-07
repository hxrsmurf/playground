import BackButton from '../backButton'
import ErrorPage from './error'

async function lookup(number: string) {
  const query = await fetch(process.env.API_URL + '/api/lookup/' + number)
  const result = await query.json()
  return result.result
}

type Data = {
  name: string
  value: string
}

export default async function page({ params }: any) {
  const query_result = await lookup(params.number)
  const status_code = query_result.status

  if (status_code) return <ErrorPage number={params.number} />

  const data: Data[] = [
    {
      name: 'Caller Name',
      value: query_result.caller_name.caller_name,
    },
    {
      name: 'Caller Type',
      value: query_result.caller_name.caller_type,
    },
    {
      name: 'Country Code',
      value: query_result.country_code,
    },
    {
      name: 'Phone Number',
      value: query_result.phone_number,
    },
    {
      name: 'National Format',
      value: query_result.national_format,
    },
    {
      name: 'Carrier',
      value: query_result.carrier.name,
    },
    {
      name: 'Carrier Type',
      value: query_result.carrier.type,
    },
  ]

  return (
    <div className='flex justify-center mt-4'>
      <div>
        <div className='text-3xl'>Results for {params.number}</div>
        <div className='mt-4'>
          <div className='grid'>
            {data.map((item: any, id: any) => (
              <div key={id} className='grid grid-cols-2'>
                <div>{item.name}</div>
                <div>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        <BackButton />
      </div>
    </div>
  )
}