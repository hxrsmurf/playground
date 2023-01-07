//https://github.com/nextauthjs/next-auth/issues/5647#issuecomment-1296853371

import { Session } from 'next-auth'

export async function getSession(cookie: string): Promise<Session | null> {
  const response = await fetch('http://localhost:3000/api/auth/session', {
    headers: { cookie },
  })

  if (!response?.ok) {
    return null
  }

  const session = await response.json()

  return Object.keys(session).length > 0 ? session : null
}
