import moment from 'moment'
import Link from 'next/link'

function daysInMonth(month: number) {
  const days = moment(month).daysInMonth()
  const all_days = []
  for (var i = 1; i < days; i++) {
    const weekday = moment()
      .month(month - 1)
      .date(i)
      .format('dddd')
    const day = moment()
      .month(month - 1)
      .date(i)
      .toISOString()
      .slice(5, 10)
    all_days.push({
      day: day,
      weekday: weekday,
    })
  }
  return all_days
}

export default function page({
  params,
}: {
  params: { year: string; month: string }
}) {
  const year = params.year
  const month = params.month
  const page_title = year + '-' + month
  const days_in_month = daysInMonth(Number(month))
  return (
    <div className='flex justify-center mt-14'>
      <div>
        <div>Journal Entries for {page_title}</div>
        {days_in_month.map((day, key) => (
          <div>
            <div key={key} className='mt-2'>
              <Link href={day.day.replace('-', '/')}>
                {day.day + ' - ' + day.weekday}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
