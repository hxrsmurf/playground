'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'

export default function EditForm(data: {
  data: { year_month_day: string; content: string }
}) {
  const [showEdit, setShowEdit] = useState(true)
  const [newContent, setNewContent]: any = useState()
  const [newYearMonthDay, setNewYearMonthDay] : any = useState()

  const {user} = useUser()
  const handleClick = () => {
    const year_month_day = data.data.year_month_day
    const content = data.data.content
    setShowEdit(false)
    setNewContent(content)
    setNewYearMonthDay(year_month_day)
  }
  const handleUpdate = (e: any) => {
    setNewContent(e.target.value)
  }
  const handleSubmit = async () => {
    const submit_data = {
      timestamp: new Date().getTime(),
      content: newContent,
      title: newYearMonthDay
    }
    await fetch('http://localhost:3000/api/journal', {
      method: 'POST',
      body: JSON.stringify(submit_data),
      headers: {
        'Content-Type': 'application/json',
        user: user!['id']
      }
    })
    setNewContent('')
    setNewYearMonthDay('')
    setShowEdit(true)
  }

  if (!showEdit)
    return (
      <div>
        <form className='text-black min-w-[400px]'>
          <textarea
            id='textarea'
            rows={10}
            onChange={(e) => handleUpdate(e)}
            value={newContent}
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
  return (
    <button
      className='mt-4 rounded-full bg-green-300 text-black min-w-[200px] min-h-[30px]'
      onClick={() => handleClick()}
    >
      Edit
    </button>
  )
}
