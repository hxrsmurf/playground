'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import { todayPage } from '../lib/utils'

export default function JournalForm() {
  const [journal, setJournal] = useState('')
  const handleUpdate = (e: any) => {
    setJournal(e.target.value)
  }
  const { user } = useUser()

  if (!user) return <div>Not loggined</div>

  const user_id = user!['id']

  const timestamp = new Date().getTime()
  const today_page = todayPage()

  const handleSubmit = async () => {
    const submit_data = {
      user: user_id,
      timestamp: timestamp,
      entry: journal,
      today_page: today_page,
    }
    console.log(submit_data)
    await fetch('http://localhost:3000/api/journal', {
      method: 'POST',
      body: JSON.stringify(submit_data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
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
