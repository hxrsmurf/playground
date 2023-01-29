import Link from 'next/link'
import { available_dates } from '../utils/dates'

export default function Navigation() {
  const months = available_dates().months
  const years = String(available_dates().year)

  return (
    <div className='flex justify-center mt-4'>
      {/* Desktop Menu */}
      <div className='hidden min-[1400px]:grid min-[1400px]:grid-flow-col min-[1400px]:space-x-4'>
        {Object.values(months).map((month: any, id: any) => (
          <div key={id}>
            <Link href={month}>{month}</Link>
          </div>
        ))}
      </div>
      {/* Desktop Menu */}

      {/* Mobile Menu */}
      <div className='cursor-pointer min-[1400px]:hidden'>
        <details>
          <summary>Menu</summary>
          <div>
            {/* <div>
              <Link href={years}>{years}</Link>
            </div> */}
            {Object.values(months).map((month: any, id: any) => (
              <div key={id}>
                <Link href={month}>{month}</Link>
              </div>
            ))}
          </div>
        </details>
      </div>
      {/* Mobile Menu */}

    </div>
  )
}