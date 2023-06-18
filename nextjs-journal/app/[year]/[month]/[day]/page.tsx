import { currentUser } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/dist/types/server'
import Link from 'next/link'
import { createClient } from 'redis'

async function fetchEntries(user: User | null, year_month_day: string) {
  const client = createClient({
    url: 'redis://' + process.env.REDIS_SERVER + ':6379',
  })
  await client.connect()
  const redis_key: string = user!['id'] + "-" + year_month_day
  const entries = await client.sScan(redis_key, 0)
  return entries['members']
}
export default async function Page({
  params,
}: {
  params: { year: string; month: string; day: string }
}) {
  // { year: '2023', month: '06', day: '18' }
  const year = params.year
  const month = params.month
  const day = params.day

  const year_month_day = year + '/' + month + '/' + day
  const user = await currentUser()
  const entries = await fetchEntries(user, year_month_day)

  return (
    <div className='flex justify-center mt-14'>
      <div className='font-bold'>
        <Link href={'/'}>Home</Link>
        <div className='font-bold mt-4'>
          Journal for {year}-{month}-{day}
          {entries.map((entry, key) => (
            <div key={key} className='mt-4'>
              <div>{new Date(JSON.parse(entry).timestamp).toString()}</div>
              <div>{JSON.parse(entry).entry}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
