import { createClient } from 'redis'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {
  return (
    <div className='flex justify-center mt-14'>
      <div>Hello World</div>
    </div>
  )
}
