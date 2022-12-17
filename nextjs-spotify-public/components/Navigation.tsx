import Link from "next/link"
import { available_dates } from "../utils/dates"

export default function Navigation() {
  const months = available_dates().months

  return (
    <div className='flex justify-center mt-4'>
      <div className='grid grid-flow-col space-x-4'>
        {Object.values(months).map((month: any, id: any)=>(
          <div key={id}>
            <Link href={month}>{month}</Link>
            </div>
        ))}
      </div>
    </div>
  )
}
