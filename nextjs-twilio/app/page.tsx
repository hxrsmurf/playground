'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function page() {
  const router = useRouter()
  const [loading, setLoading]: any = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    const number_to_search: any = document.querySelector('#number')
    const actual_number = number_to_search.value
    const parsed_number = parseNumber(actual_number)
    router.push('/lookup/' + actual_number)
  }

  return (
    <div className='flex justify-center mt-4'>
      <div>
        {loading ? (
          <>Loading...</>
        ) : (
          <>
            <div>Lookup a number - US Only</div>
            <form className='grid mt-4' onSubmit={(e) => handleSubmit(e)}>
              <input
                id='number'
                type='tel'
                className='mt-4 py-2 pl-3'
                pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                defaultValue='555-555-5555'
              />
              <button className='mt-4 rounded-lg bg-blue-500 px-4 py-2'>
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function parseNumber(number: string) {
  if (number.includes(' ')) {
    return number.replaceAll(' ', '')
  }
  if (number.includes('-')) {
    return number.replaceAll('-', '')
  }
  return number
}
