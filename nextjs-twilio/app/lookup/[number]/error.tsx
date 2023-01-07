'use client'

import BackButton from '../backButton'

export default function ErrorPage(number: any) {
  return (
    <div className='flex justify-center mt-4'>
      <div>
        <div>Cannot find {number.number}</div>
        <BackButton />
      </div>
    </div>
  )
}
