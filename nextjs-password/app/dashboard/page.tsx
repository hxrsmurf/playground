import Link from 'next/link'
import Determine from './determine'

export default async function page() {
  return (
    <div className='bg-[#f1f5f8] text-black mt-12'>
      <div className='text-3xl flex justify-center py-28'>
        <div className='grid grid-cols-1 place-content-center space-y-8'>
          <div className='font-bold'>Dashboard</div>
          <div>
            <Determine />
          </div>
          <div className='flex grid-cols-2 space-x-8 justify-center'>
            <Link href='/dashboard/passwords'>Passwords</Link>
            <div>Settings</div>
          </div>
        </div>
      </div>
    </div>
  )
}
