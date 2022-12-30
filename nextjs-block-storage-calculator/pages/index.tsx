import Backblaze from "../components/backblaze";
import BunnyCDN from "../components/bunnycdn";

export default function Home() {
  return (
    <div className='flex justify-center mt-8'>
      <div className="min-w-[800px]">
        <div>Hello World</div>
        <div className="mt-4">
          <Backblaze/>
        </div>
        <div className="min-h-[2px] bg-white m-8"></div>
        <div className="mt-4">
          <BunnyCDN/>
        </div>
      </div>
    </div>
  )
}
