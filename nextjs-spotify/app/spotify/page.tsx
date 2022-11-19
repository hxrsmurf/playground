'use client'

import { useEffect, useState } from 'react'
import MainContent from './mainContent'
import NowPlaying from './nowPlaying'
import Sidebar from './sidebar'
import Top from './top'

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
      <div className='flex grid-cols-2 mt-8 space-x-32'>
        <div className='min-w-[200px] ml-4'>
          <Sidebar content={setContent} />
        </div>
        {content == 'main' || content == 'home' ? (
          <MainContent />
        ) : (
          <>
            <Top type={content} setLoading={setLoading} />
          </>
        )}
      </div>

      <div className='fixed bottom-0 min-w-full'>
        <NowPlaying />
      </div>
    </>
  )
}
