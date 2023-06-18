import JournalForm from '@/components/JournalForm'
import { todayPage } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs'
import Link from 'next/link'
import { createClient } from 'redis'

export default async function Home() {
  const user = await currentUser()
  const today_page = todayPage()

  const redis_server = "redis://" + process.env.REDIS_SERVER + ":6379"
  const client = createClient({
    url: redis_server
  })

  client.on('error', err => console.log('Redis Client Error', err))
  await client.connect()

  return (
    <div className='flex justify-center mt-14'>
      <div>
        <div>Welcome {user?.firstName}</div>
        <div>
          Today is <Link href={today_page}>{today_page}</Link>
        </div>
        <JournalForm />
      </div>
    </div>
  )
}
