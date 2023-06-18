'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'

export default function JournalForm() {
  const [journal, setJournal] = useState('')
  const handleUpdate = (e: any) => {
    setJournal(e.target.value)
  }
  const { user } = useUser()

  const handleSubmit = () => {
    console.log(user['id'], journal)
    setJournal('')
  }

  return (
    <div className='mt-4'>
      <form className='text-black min-w-[400px]'>
        <textarea
          id='textarea'
          rows={10}
          onChange={(e) => handleUpdate(e)}
          value={journal}
        ></textarea>
      </form>
      <button
        className='mt-4 rounded-full bg-blue-300 text-black min-w-[200px] min-h-[30px]'
        onClick={() => handleSubmit()}
      >
        Submit
      </button>
    </div>
  )
}
