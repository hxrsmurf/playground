'use client'

import { useEffect, useState } from 'react'
import MasterForm from './masterForm'

async function determineDashboard() {
  const query = await fetch('http://localhost:3000/api/auth/determineDashboard')
  const result = await query
  return result.status
}

export default function determine() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const query = async () => {
      const statusLoggedIn = await determineDashboard()
      if (statusLoggedIn == 200) {
        setIsLoggedIn(true)
      }
      setIsLoading(false)
    }
    query()
  }, [])

  if (isLoading) return <>Loading...</>
  if (isLoggedIn) {
    console.log('LoADING state', isLoggedIn)
    return (
      <>
        <div>You are logged in</div>
        <div>
          <MasterForm />
        </div>
      </>
    )
  }
  return <>Please login</>
}
