'use client'

import Link from 'next/link'

export default function backButton() {
  return (
    <div className='mt-4 bg-blue-500 rounded-lg p-3 text-center'>
      <Link href='/'>Go Back</Link>
    </div>
  )
}
