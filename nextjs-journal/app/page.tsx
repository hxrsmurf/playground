import { currentUser } from '@clerk/nextjs';

export default async function Home() {
  const user = await currentUser()
  const today = new Date().toISOString().slice(0, 10)
  return (
    <div className='flex justify-center mt-14'>
      <div>
        <div>Welcome {user?.firstName}</div>
        <div>Today is {today}</div>
      </div>
    </div>
  )
}