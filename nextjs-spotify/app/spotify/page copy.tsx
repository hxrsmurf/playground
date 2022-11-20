'use client'

import { useEffect, useState } from 'react'
import MainContent from './mainContent'
import NowPlaying from './nowPlaying'
import Settings from './settings'
import Sidebar from './sidebar'
import Top from './top'
import ProfileMenu from './profileMenu'
import Profile from './profile'

export default function page() {
  const [loading, setLoading]: any = useState(true)
  const [content, setContent]: any = useState('main')

  useEffect(() => {
    setTimeout(() => setLoading(false), 100)
  }, [])

  if (loading)
    return (
      <>
        <div className='flex justify-center'>
          <div>Loading...</div>
        </div>
      </>
    )

  return (
    <>
      <div className='flex grid-cols-3 mt-8 space-x-32'>
        <div className='min-w-[200px] ml-4'>
          <Sidebar content={setContent} />
        </div>
        {content == 'main' || content == 'home' || content == 'settings' ? (
          <>
            {content == 'settings' ? (
              <Settings />
            ) : (
              <>
                <MainContent />
              </>
            )}
          </>
        ) : (
          <>
            {content == 'profile' ? (
              <>
                <Profile />
              </>
            ) : (
              <>
                <Top type={content} />
              </>
            )}
          </>
        )}
        <div>
          <ProfileMenu content={setContent} />
        </div>
      </div>

      <div className='fixed bottom-0 min-w-full pb-4 bg-[#181818] py-4'>
        <NowPlaying />
      </div>
    </>
  )
}
