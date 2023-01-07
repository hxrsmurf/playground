import ProfileMenu from '../profileMenu'
import Sidebar from '../sidebar'
import Profile from './profile'

export default function page() {
  return (
    <div className='grid grid-cols-8'>
      <Sidebar />
      <Profile/>
      <ProfileMenu />
    </div>
  )
}