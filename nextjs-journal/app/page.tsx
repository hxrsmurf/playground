import { currentUser } from '@clerk/nextjs';

export default async function Home() {
  const user = await currentUser();
  return (
    <div className='flex justify-center mt-14'>
      <div>
        <div>Welcome {user?.firstName}</div>
      </div>
    </div>
  )
}