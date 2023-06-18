import JournalForm from '@/components/JournalForm'
import { todayPage } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  const user = await currentUser()
  const today_page = todayPage()

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
