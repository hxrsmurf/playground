export default function TopHeader({ type, year_month }: any) {
  return (
    <>
      <div className='grid grid-flow-row'>
        <div className='font-bold text-2xl underline text-center'>
          Top 10 {type} - {year_month}
        </div>
        <div className='grid grid-flow-col my-4 font-bold text-center sm:min-w-[400px] sm:max-w-[400px] sm:ml-44'>
          <div className='min-w-[130px] max-w-[130px]'>{type}</div>
          <div>Count</div>
        </div>
      </div>
    </>
  )
}