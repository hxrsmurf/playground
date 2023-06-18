import Link from 'next/link'

function getMonths() {
  const months = []
  for (var i = 1; i < 13; i++) {
    months.push(i)
  }
  return months
}
export default async function page() {
  const months = getMonths()
  return (
    <div className='flex justify-center mt-14'>
      <div>
        <div className='m-4'>
          <Link href={'/'}>Home</Link>
        </div>
        {months.map((month, key) => (
          <div key={key}>
            <div>{'2023-' + month}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
