import { unstable_getServerSession } from 'next-auth'
import { getProviders } from 'next-auth/react'
import { authOptions } from '../../../pages/api/auth/[...nextauth]'
import LoginButton from './LoginButton'

export default async function page() {
  const session = await unstable_getServerSession(authOptions)
  const providers = await getProviders()

  return (
    <div className='bg-[#f1f5f8] text-black mt-12'>
      <div className='flex justify-center py-16'>
        <div className='grid grid-cols-1 place-content-center space-y-8'>
          <div className='text-3xl font-bold'>NextPass</div>
          <div className='text-lg'>Sign in with a provider</div>
          <div>
            <LoginButton/>
          </div>
        </div>
      </div>
    </div>
  )
}
