'use client'

import HomeIcon from '@heroicons/react/24/solid/HomeIcon'
import MagnifyingGlass from '@heroicons/react/24/solid/MagnifyingGlassIcon'
import Folder from '@heroicons/react/24/solid/FolderIcon'
import Heart from '@heroicons/react/24/solid/HeartIcon'
import MusicalNote from '@heroicons/react/24/solid/MusicalNoteIcon'
import Bars3 from '@heroicons/react/24/solid/Bars3Icon'
import Playlists from './playlists'

const links = [
  {
    name: 'Home',
    id: 'home',
    url: '/',
    icon: <HomeIcon className='h-6 w-6 text-[#b3b3b3] hover:text-white' />,
  },
  {
    name: 'Search',
    id: 'search',
    url: '/search',
    icon: (
      <MagnifyingGlass className='h-6 w-6 text-[#b3b3b3] hover:text-white' />
    ),
  },
  {
    name: 'Your Library',
    id: 'collection',
    url: '/collection',
    icon: <Folder className='h-6 w-6 text-[#b3b3b3] hover:text-white' />,
  },
  {
    name: 'Top Artists',
    id: 'artists',
    url: '/top/artists',
    icon: <MusicalNote className='h-6 w-6 text-[#b3b3b3] hover:text-white' />,
  },
  {
    name: 'Top Tracks',
    id: 'tracks',
    url: '/top/tracks',
    icon: <Bars3 className='h-6 w-6 text-[#b3b3b3] hover:text-white' />,
  },
]

export default function sidebar({ content }: any) {
  const handleClick = (e: any) => {
    content(e.target.id)
  }

  return (
    <div className='space-y-6'>
      {links.map((link: any, id: any) => (
        <div
          key={id}
          className='grid grid-cols-3 text-left text-[#b3b3b3] hover:text-white cursor-pointer'
          onClick={(e) => handleClick(e)}
        >
          <div id={link.id}>{link.icon}</div>
          <div id={link.id} className='col-span-2'>
            {link.name}
          </div>
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
