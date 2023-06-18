import Link from 'next/link'

export default function Page({
  params,
}: {
  params: { year: string; month: string; day: string }
}) {
  // { year: '2023', month: '06', day: '18' }
  const year = params.year
  const month = params.month
  const day = params.day

  return (
    <div className='flex justify-center mt-14'>
      <div className='font-bold'>
        <Link href={'/'}>Home</Link>
        <div className='font-bold mt-4'>
          Journal for {year}-{month}-{day}
        </div>
      </div>
    </div>
  )
}
