'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import ChevronDown from '@heroicons/react/24/solid/ChevronDownIcon'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const settings = [
  {
    name: 'Account',
    id: 'account',
    url: '/spotify/account',
  },
  {
    name: 'Profile',
    id: 'profile',
    url: '/spotify/profile',
  },
  {
    name: 'Support',
    id: 'support',
    url: '/spotify/support',
  },
  {
    name: 'Download',
    id: 'download',
    url: '/spotify/download',
  },
  {
    name: 'Settings',
    id: 'settings',
    url: '/spotify/settings',
  },
  {
    name: 'Logout',
    id: 'logout',
    url: '/spotify/logout',
  },
]

export default function profileMenu() {
  const [showSettings, setShowSettings]: any = useState()
  const [profile, setProfile]: any = useState()
  const router = useRouter()

  useEffect(() => {
    const getProfile = async () => {
      const req = await fetch('/api/spotify/me')
      const res = await req.json()
      setProfile(res)
    }
    getProfile()
  }, [])

  const handleClick = () => {
    setShowSettings(showSettings ? false : true)
  }

  const handleLeave = () => {
    setShowSettings(false)
  }

  const handleClickMenu = (e: any) => {
    const id = e.target.id
    if (id == 'logout') {
      router.push('/api/auth/logout')
    }
    setShowSettings(false)
  }

  if (!profile) return <></>

  return (
    <>
      <div
        className='rounded-xl fixed right-24 hover:bg-[#282828] mt-4'
        onMouseLeave={() => handleLeave()}
      >
        <button
          className='grid grid-cols-4 items-center text-left dropdown'
          onClick={() => handleClick()}
        >
          <div>
            <Image
              style={{ borderRadius: '50%' }}
              src={profile.profile.images[0].url}
              width={45}
              height={45}
              alt=''
            />
          </div>
          <div className='mr-3 min-w-full col-span-2'>
            {profile.profile.display_name}
          </div>
          <div>
            <ChevronDown className='h-4 w-4' />
          </div>
        </button>

        <div hidden={showSettings ? false : true}>
          <div className='bg-[#282828] grid my-4 mx-2 px-2 space-y-2 py-2 cursor-pointer'>
            {settings.map((setting: any, id: any) => (
              <div
                key={id}
                id={setting.id}
                className='col-span-2 hover:bg-[#4C4C4B] py-2 px-2'
                onClick={(e) => handleClickMenu(e)}
              >
                <Link href={setting.url}>{setting.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
