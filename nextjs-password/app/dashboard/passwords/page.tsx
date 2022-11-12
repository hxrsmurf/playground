'use client'

import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from 'react'
import NewPasswordForm from './newPasswordForm'
import ViewPasswordModal from './viewPasswordModal'

export default function page() {
  const [showNewPassword, setShowNewPassword]: any = useState()
  const [loadingSubmitPassword, setLoadingSubmitPassword]: any = useState(false)
  const [currentPasswords, setCurrentPasswords]: any = useState()
  const [pageLoading, setPageLoading]: any = useState(true)

  const handleShowNewPassword = () => {
    setShowNewPassword(true)
  }

  const handleSubmitNewPassword = (passwordData: any) => {
    setLoadingSubmitPassword(true)
    const submitData = async () => {
      const query = await fetch('http://localhost:3000/api/password', {
        method: 'PUT',
        body: JSON.stringify(passwordData),
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      })
      const result = await query.json()
    }
    submitData()
    setShowNewPassword(false)
    setTimeout(() => setLoadingSubmitPassword(false), 1000)
  }

  useEffect(() => {
    setPageLoading(true)
    const query = async () => {
      const req = await fetch('http://localhost:3000/api/password')
      const res = await req.json()
      setCurrentPasswords(res.message)
    }
    query()
    setPageLoading(false)
  }, [])

  const [viewPassword, setViewPassword]: any = useState(false)
  const [password, setPassword]: any = useState()

  const handleViewPassword = (e: any) => {
    setViewPassword(true)
    setPassword(e)
  }

  if (showNewPassword)
    return (
      <>
        <NewPasswordForm handleSubmitNewPassword={handleSubmitNewPassword} />
      </>
    )

  if (pageLoading)
    return (
      <>
        <div className='bg-[#f1f5f8] text-black flex grid-cols-3 justify-center space-x-72 text-3xl py-32'>
          <div>Loading...</div>
        </div>
      </>
    )

  return (
    <div className='bg-[#f1f5f8] text-black flex grid-cols-3 justify-center space-x-72 text-3xl py-32'>
      {loadingSubmitPassword ? (
        <>Submitting...</>
      ) : (
        <>
          <div>
            <div className='font-bold'>Passwords</div>
            <div>
              {!currentPasswords ? (
                <></>
              ) : (
                <>
                  <div className='grid grid-flow-row'>
                    {currentPasswords.map(
                      (
                        password: {
                          Title: any
                        },
                        id: any
                      ) => (
                        <div
                          key={id}
                          className='cursor-pointer'
                          onClick={() => handleViewPassword(password)}
                        >
                          {password.Title}
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {viewPassword ? (
            <>
              <ViewPasswordModal password_id={password} />
            </>
          ) : (
            <></>
          )}
          <div>
            <button
              onClick={() => handleShowNewPassword()}
              className='rounded-full bg-blue-400 min-w-full min-h-[70px]'
            >
              New Password
            </button>
          </div>
        </>
      )}
    </div>
  )
}
