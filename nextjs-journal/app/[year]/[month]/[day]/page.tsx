import JournalForm from '@/components/JournalForm'
import { currentUser } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/dist/types/server'
import Link from 'next/link'
import { createClient } from 'redis'

async function fetchEntries(user: User | null, year_month_day: string) {
  const client = createClient({
    url: 'redis://' + process.env.REDIS_SERVER + ':6379',
  })

  await client.connect()
  const user_id = user!['id']
  const results = await client.hGet(user_id, year_month_day)
  return results
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

  const year_month_day = year + '-' + month + '-' + day
  const user = await currentUser()
  const entries: any = await fetchEntries(user, year_month_day)

  var content: any = null

  if (entries) content = JSON.parse(entries).content

  return (
    <div className='flex justify-center mt-14'>
      <div>
        <div>
          <Link className='font-bold' href={'/'}>
            Home
          </Link>
        </div>
        <div>
          Journal for <Link href={'/' + year}>{year}</Link> {' --> '}
          <Link href={'/' + year + '/' + month}>{month}</Link>
          {' --> '}
          {day}
        </div>
        <div className='mt-4'>
          {content ? (
            <div className='whitespace-pre-line'>{content}</div>
          ) : (
            <JournalForm entry={year_month_day}/>
          )}
        </div>
      </div>{' '}
    </div>
  )
}
