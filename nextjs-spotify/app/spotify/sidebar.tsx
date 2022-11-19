import HomeIcon from '@heroicons/react/24/solid/HomeIcon'
import MagnifyingGlass from '@heroicons/react/24/solid/MagnifyingGlassIcon'
import Folder from '@heroicons/react/24/solid/FolderIcon'
import Heart from '@heroicons/react/24/solid/HeartIcon'
import Playlists from './playlists'

const links = [
  {
    name: 'Home',
    url: '/',
    icon: <HomeIcon className='h-6 w-6 text-[#b3b3b3] hover:text-white' />,
  },
  {
    name: 'Search',
    url: '/search',
    icon: (
      <MagnifyingGlass className='h-6 w-6 text-[#b3b3b3] hover:text-white' />
    ),
  },
  {
    name: 'Your Library',
    url: '/collection',
    icon: <Folder className='h-6 w-6 text-[#b3b3b3] hover:text-white' />,
  },
]

export default function sidebar() {
  return (
    <div className='space-y-6'>
      {links.map((link) => (
        <div className='grid grid-cols-3 text-left text-[#b3b3b3] hover:text-white cursor-pointer'>
          <div>{link.icon}</div>
          <div className='col-span-2'>{link.name}</div>
        </div>
      ))}
      <div className='min-h-[1.2px] bg-[#b3b3b3]'></div>
      <div className='grid grid-cols-3 text-left text-[#b3b3b3] hover:text-white cursor-pointer'>
        <div>
          <Heart className='h-6 w-6 text-[#b3b3b3] hover:text-white' />
        </div>
        <div className='col-span-2'>Liked Songs</div>
      </div>
      <div className='min-h-[1.2px] bg-[#b3b3b3]'></div>
      <Playlists />
    </div>
  )
}
