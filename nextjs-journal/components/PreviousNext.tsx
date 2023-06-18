import moment from 'moment'
import Link from 'next/link'

export function PreviousNext(data: any) {
  const year = data.data.year
  const month = data.data.month - 1
  const day = data.data.day

  const previous = moment([year, month, day])
    .subtract(1, 'day')
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '/')
  const next = moment([year, month, day])
    .add(1, 'day')
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '/')

  return (
    <div className='text-white flex justify-end'>
      <div className='grid grid-cols-2 space-x-3'>
        <Link href={'/' + previous}>Previous</Link>
        <Link href={'/' + next}>Next</Link>
      </div>
    </div>
  )
}
