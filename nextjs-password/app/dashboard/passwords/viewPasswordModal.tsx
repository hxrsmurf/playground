'use client'

import { useState } from 'react'

export default function viewPasswordModal({ password_id }: any) {
  const [decryptedPassword, setdecryptedPassword]: any = useState()

  const handleClick = (e: any) => {
    const doIt = async () => {
      const query = await fetch('http://localhost:3000/api/decrypt', {
        method: 'POST',
        body: e.target.id,
      })
      const result = await query.json()
      const previous_element = e.target.previousElementSibling.id
      const new_item = {
        previous: previous_element,
        value: result.message,
      }
      setdecryptedPassword(new_item)
    }
    doIt()
  }

  return (
    <>
      <div className='grid-flow-row'>
        {Object.keys(password_id).map((key, id) => (
          <>
            {key == 'sk' || key == 'pk' || key == 'user' ? (
              <></>
            ) : (
              <div key={id} className='py-8'>
                <div className='font-bold' id={key}>
                  {key}
                </div>
                <div
                  onClick={(e) => handleClick(e)}
                  id={password_id[key]}
                  className='cursor-pointer'
                >
                  {password_id[key]}
                </div>
                {decryptedPassword && decryptedPassword.previous == key ? (
                  <>
                    {decryptedPassword.previous == key ? (
                      <>{decryptedPassword.value}</>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            )}
            <div className='outline mt-2'></div>
          </>
        ))}
      </div>
    </>
  )
}
