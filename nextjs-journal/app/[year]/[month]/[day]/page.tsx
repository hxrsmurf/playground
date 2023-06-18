import EditForm from '@/components/EditForm'
import JournalForm from '@/components/JournalForm'
import { PreviousNext } from '@/components/PreviousNext'
import { currentUser } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/dist/types/server'
import moment from 'moment'
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
  const year: string = params.year
  const month: string = params.month
  const day: string = params.day

  const year_month_day: any = year + '-' + month + '-' + day
  const weekday: string = moment([year, Number(month) - 1, day]).format('dddd')

  const user = await currentUser()
  const entries: any = await fetchEntries(user, year_month_day)

  var content: any = null

  if (entries) content = JSON.parse(entries).content

  return (
    <div className='flex justify-center mt-14'>
      <div>
        <div className='flex justify-center'>
          <Link className='font-bold' href={'/'}>
            Home
          </Link>
        </div>
        <div className='flex justify-center mt-4 mb-8'>
          <div>
            Journal for<Link href={'/' + year}> {year}</Link> {' --> '}
            <Link href={'/' + year + '/' + month}>{month}</Link>
            {' --> '}
            {day} {' --> '}
            {weekday}
          </div>
        </div>
        <div className='mt-4'>
          {content ? (
            <div className='flex justify-center'>
              <div className='grid grid-flow-row'>
                <div className='whitespace-pre-line min-w-[1000px] max-w-[1000px] flex justify-center'>
                  {content}
                </div>
                <div className='mt-10 flex justify-center'>
                  <EditForm
                    data={{ year_month_day: year_month_day, content: content }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className='flex justify-center'>
              <div className='min-w-[1000px] max-w-[1000px] flex justify-center pl-40'>
                <JournalForm entry={year_month_day} />
              </div>
            </div>
          )}
        </div>
        <div className='mt-8'>
          <div className='space-y-4'>
            <div className='bg-white min-h-[3px]'></div>
            <div>
              <PreviousNext data={params} />
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  )
}
