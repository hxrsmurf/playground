export default function MonthNotAvailable(month: any) {
  return (
    <div className='flex justify-center mt-14'>
      <div>
        <div>{month.month} is not available.</div>
        <div>Try selecting another date from the menu.</div>
      </div>
    </div>
  )
}
