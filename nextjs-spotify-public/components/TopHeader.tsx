export default function TopHeader({type, year_month}: any) {
  return (
    <>
      <div className='grid grid-flow-row'>
        <div className="font-bold text-2xl">
          Top 10 {type} - {year_month}
        </div>
        <div className='grid grid-flow-col my-4 font-bold'>
          <div className="min-w-[250px]">{type}</div>
          <div>Count</div>
        </div>
      </div>
    </>
  )
}
