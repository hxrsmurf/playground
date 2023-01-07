import ProfileMenu from '../profileMenu'
import Sidebar from '../sidebar'
import Liked from './liked'

export default function page() {
  return (
    <div className='grid grid-cols-3'>
      <Sidebar />
      <div className='mt-4'>Collection page</div>
      <ProfileMenu />
    </div>
  )
}
