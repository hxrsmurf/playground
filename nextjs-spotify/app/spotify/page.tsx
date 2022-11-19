'use client'

import { useEffect, useState } from 'react'
import MainContent from './mainContent'
import Sidebar from './sidebar'

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
    <div className='flex grid-cols-2 mt-8 space-x-32'>
      <div className='min-w-[200px] ml-4'>
        <Sidebar />
      </div>
      {content == 'main' ? (
        <MainContent/>
      ) : (
        <> other contnet</>
      )}
    </div>
  )
}
