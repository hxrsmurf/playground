export default function Page({ params }: { params: { slug: string } }) {
  // { year: '2023', month: '06', day: '18' }
  const year = params.year
  const month = params.month
  const day = params.day

  return (
    <div className='flex justify-center mt-14'>
      <div className='font-bold'>
        Journal for {year}-{month}-{day}
      </div>
    </div>
  )
}