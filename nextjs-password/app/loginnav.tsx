'use client'

import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Data = {
  access_token: string
}

type Url = string

async function getLoginUrl() {
  const query_spotify_url = await fetch('http://localhost:3000/api/login')
  const spotify_url = await query_spotify_url.json()
  return spotify_url.url
}

export default function loginnav({ item }) {
  const [isLoading, setisLoading] = useState(false)
  const [data, setData] = useState<Data>()
  const [loginUrl, setLoginUrl] = useState<Url>()

  const router = useRouter()

  const handleLogout = async () => {
    await fetch('http://localhost:3000/api/logout')
    setisLoading(true)
  }

  useEffect(() => {
    setisLoading(true)
    const query = async () => {
      const req = await fetch('http://localhost:3000/api/accessToken')
      const res = await req.json()
      setData(res)
      setLoginUrl(await getLoginUrl())
    }
    query()

    setisLoading(false)
  }, [isLoading])

  if (isLoading) return <div>Loading navigation...</div>
  if (data === undefined || loginUrl === undefined) return <></>
  if (!data.access_token) return <Link href={loginUrl}>{item.name}</Link>
  if (data) return <div onClick={() => handleLogout()}>Logout</div>
}
