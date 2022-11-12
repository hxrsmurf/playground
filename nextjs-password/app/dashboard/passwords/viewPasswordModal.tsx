'use client'

import { useState } from 'react'

export default function viewPasswordModal({ id }: any) {
  const [testing, setTesting]: any = useState()
  const handleClick = (e: any) => {
    const doIt = async () => {
      const query = await fetch('http://localhost:3000/api/decrypt', {
        method: 'POST',
        body: e.target.id,
      })
      const result = await query.json()

      const previous_element = e.target.previousElementSibling.id
      const new_item = {
        key: {
          previous_element,
          result,
        },
      }
      setTesting(new_item)
    }
    doIt()
  }
  return (
    <>
      <div className='grid-flow-row'>
        <div
          className='rounded-2xl bg-blue-300'
          onClick={(e) => handleClick(e.target)}
        >
          Decrypt
        </div>
        <div>
          {Object.keys(id).map((key) => (
            <>
              {key == 'user' || key == 'sk' || key == 'pk' ? (
                <></>
              ) : (
                <div key={id}>
                  <div className='font-bold mt-4' id={key}>
                    {key}
                  </div>
                  <div
                    onClick={(e) => handleClick(e)}
                    className='ml-14 cursor-pointer'
                    id={id[key]}
                  >
                    {id[key]}
                  </div>
                  {testing ? (
                    <>
                      {testing.key == key ? (
                        <>kevin</>
                      ) : (
                        <>{testing.key.result.message}</>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  <div className='outline mt-2'></div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  )
}
