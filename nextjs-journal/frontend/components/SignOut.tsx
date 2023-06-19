import { SignOutButton } from '@clerk/nextjs'

export default function SignOut() {
  return (
    <button className='mt-4 rounded-full bg-blue-300 text-black min-w-[100px]'>
      <SignOutButton />
    </button>
  )
}
