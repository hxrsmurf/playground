export default function JournalForm() {
  return (
    <div className='mt-4'>
      <form className='text-black min-w-[400px]'>
        <textarea rows={10}>Journal entry</textarea>
      </form>
      <button className='mt-4 rounded-full bg-blue-300 text-black min-w-[200px] min-h-[30px]'>
        Submit
      </button>
    </div>
  )
}
