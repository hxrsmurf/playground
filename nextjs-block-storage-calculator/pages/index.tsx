import Backblaze from "../components/backblaze";

export default function Home() {
  return (
    <div className='flex justify-center mt-8'>
      <div className="min-w-[800px]">
        <div>Hello World</div>
        <div className="mt-4">
          <Backblaze/>
        </div>
      </div>
    </div>
  )
}
