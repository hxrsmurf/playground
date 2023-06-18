import Link from 'next/link'

function getMonths() {
  const months = []
  for (var i = 1; i < 13; i++) {
    months.push(i)
  }
  return months
}
export default async function page({ params }: { params: { year: string } }) {
  const months = getMonths()
  const year = params.year
  return (
    <div className='flex justify-center mt-14'>
      <div>
        <div className='m-4'>
          <Link href={'/'}>Home</Link>
        </div>
        {months.map((month, key) => (
          <div key={key}>
            <div>
              <Link href={year + '/' + month}>{year + '-' + month} </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
