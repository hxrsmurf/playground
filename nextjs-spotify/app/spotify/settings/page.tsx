import ProfileMenu from '../profileMenu'
import Sidebar from '../sidebar'

export default function page() {
  return (
    <div className='grid grid-cols-3'>
      <Sidebar />
      <div className='col-span-2 mt-6'>
        <div className='font-bold text-2xl'>Settings</div>
        <div>Delete My Data!</div>
      </div>
      <ProfileMenu />
    </div>
  )
}