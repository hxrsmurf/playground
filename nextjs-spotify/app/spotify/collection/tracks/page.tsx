import ProfileMenu from '../../profileMenu'
import Sidebar from '../../sidebar'
import Liked from './liked'

export default function page() {
  return (
    <div className='grid grid-cols-8'>
      <Sidebar />
      <div className='mt-4'>
        <Liked />
      </div>
      <ProfileMenu />
    </div>
  )
}
