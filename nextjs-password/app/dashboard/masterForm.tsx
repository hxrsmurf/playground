'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function MasterForm() {
  const [password, setPassword] = useState()
  const [isMasterSet, setisMasterSet] = useState(false)
  const router = useRouter()

  const handleInputPassword = (e: any) => {
    setPassword(e.target.value)
  }

  const handleClearMaster = () => {
    setPassword(undefined)
    setisMasterSet(false)
    router.refresh()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const submitData = async () => {
      const query = await fetch('http://localhost:3000/api/masterPassword', {
        method: 'POST',
        body: password,
      })
      const result = await query.json()
    }

    console.log('Submitting password:', password)
    submitData()
    setPassword(undefined)
    setisMasterSet(true)
  }

  if (isMasterSet)
    return (
      <>
        <div>Logged in with master password</div>
        <div><button className='outline-dotted bg-gray-400 mt-3' onClick={()=> handleClearMaster() }>Clear master</button></div>
      </>
    )

  return (
    <div className='mt-5 md:col-span-2 md:mt-0'>
      <form action='#'>
        <div className='shadow sm:overflow-hidden sm:rounded-md'>
          <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-3 sm:col-span-2'>
                <label htmlFor='password' className='text-black'>
                  Password for Master Key
                </label>
                <div className='mt-1 flex rounded-md'>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='quickbrownfox'
                    className='mt-2 text-white'
                    value={password || ''}
                    onChange={(e) => handleInputPassword(e)}
                  ></input>
                </div>
                <div>
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className='rounded-full mt-3 bg-blue-400 min-w-full min-h-[70px]'
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
