import Link from 'next/link'

const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022]
export default function page() {
  return (
    <div className='flex justify-center mt-14'>
      <div className='mt-4 font-bold'>
        <Link href={'/'}>Home</Link>
        <div>Previous Years</div>
        {years.map((year, key) => (
          <div key={key} className='m-4 font-normal'>
            <Link href={String(year)}>{String(year)}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}