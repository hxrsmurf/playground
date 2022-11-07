'use client'

import { unstable_getServerSession } from 'next-auth'
import {
  getProviders,
  SessionProvider,
  signIn,
  useSession,
} from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function LoginButton() {
  const [providers, setProviders] = useState()
  useEffect(() => {
    const getProviders = async () => {
      const query = await fetch('http://localhost:3000/api/auth/providers')
      const result = await query.json()
      setProviders(result)
    }
    getProviders()
  }, [])

  return (
    <>
      {!providers ? (
        <></>
      ) : (
        <>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className='rounded-md
                    bg-blue-500
                    w-48
                    h-10
                    text-white
                    text-2xl
                    mt-2
                    '
                onClick={() => signIn(provider.id)}
              >
                {provider.name}
              </button>
            </div>
          ))}
        </>
      )}
    </>
  )
}
