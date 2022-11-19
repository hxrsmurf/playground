import { getCookies } from '../../utils/utils'
import Sidebar from './sidebar'

export default function page() {
  const cookies = getCookies()
  if (!cookies.access_token) return <>You must login.</>
  return (
    <div className='flex grid-cols-2 mt-2'>
      <div className='min-w-[200px] ml-4'><Sidebar/></div>
      <div>Main Content</div>
    </div>
  )
}