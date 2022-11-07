// https://github.com/nextauthjs/next-auth/issues/5647#issuecomment-1296853371

'use client'
import { SessionProvider, SessionProviderProps } from 'next-auth/react'
export default function ClientSessionProvider(props: SessionProviderProps) {
  return <SessionProvider {...props} />
}
