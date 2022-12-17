import Link from "next/link"

export default function Navigation() {
  const year = 2022
  const month = new Date().getMonth() + 1
  var start: number = 0

  const months: any = []

  while (start < month) {
    start = start + 1
    let start_string = String(start)
    if (start_string.length < 2) start_string = '0' + start_string
    let final_string = year + start_string
    months.push(year + '-' + start_string)
  }

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
