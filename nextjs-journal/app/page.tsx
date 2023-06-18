import JournalForm from '@/components/JournalForm'
import { currentUser } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  const user = await currentUser()
  const today = new Date().toISOString().slice(0, 10)

  const year = today.split('-')[0]
  const month = today.split('-')[1]
  const day = today.split('-')[2]
  const today_page = year + '/' + month + '/' + day

  return (
    <div className='flex justify-center mt-14'>
      <div>
        <div>Welcome {user?.firstName}</div>
        <div>
          Today is <Link href={today_page}>{today}</Link>
        </div>
        <JournalForm />
      </div>
    </div>
  )
}
