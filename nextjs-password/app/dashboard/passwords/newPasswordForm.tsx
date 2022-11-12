'use client'

import { useState } from 'react'

const passwordFields = [
  {
    name: 'Title',
  },
  {
    name: 'Username',
  },
  {
    name: 'Password',
  },
  {
    name: 'URL',
  },
  {
    name: 'Notes',
  },
]

export default function newPasswordForm({ handleSubmitNewPassword }: any) {
  const [passwordData, setPasswordData]: any = useState([])
  const [title, setTitle]: any = useState()
  const [username, setUsername]: any = useState()
  const [password, setPassword]: any = useState()
  const [url, setURL]: any = useState()
  const [notes, setNotes]: any = useState()

  const handleInputUpdate = (e: any) => {
    const id = e.target.id
    const value = e.target.value
    const item = {
      name: id,
      value: value,
    }

    switch (id) {
      case 'Title':
        setTitle(item)
        break
      case 'Username':
        setUsername(item)
        break
      case 'Password':
        setPassword(item)
        break
      case 'URL':
        setURL(item)
        break
      case 'Notes':
        setNotes(item)
        break
    }
    setAll()
  }

  const setAll = () => {
    setPasswordData({
      title,
      username,
      password,
      url,
      notes,
    })
  }

  return (
    <>
      <div className='bg-[#f1f5f8] text-black flex justify-center text-3xl py-24'>
        <div className='grid grid-cols-1 space-y-14'>
          <div>Create a New Password</div>
          <div>
            {passwordFields.map((password, id) => (
              <div key={id} className='my-4'>
                <div>{password.name}</div>
                <div className='text-white max-w-md'>
                  {password.name == 'Notes' ? (
                    <>
                      <textarea
                        id={password.name}
                        onChange={(e) => handleInputUpdate(e)}
                      ></textarea>
                    </>
                  ) : (
                    <>
                      <input
                        type='text'
                        id={password.name}
                        onChange={(e) => handleInputUpdate(e)}
                      ></input>
                    </>
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={() => handleSubmitNewPassword(passwordData)}
              className='rounded-full mt-3 bg-blue-400 min-w-full min-h-[70px]'
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
