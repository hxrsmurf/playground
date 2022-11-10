// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// https://nextjs.org/docs/advanced-features/middleware#using-cookies
export function middleware(request: NextRequest) {
  const allCookies = request.cookies.getAll()
  const response = NextResponse.next()
  response.cookies.delete('email')
  response.cookies.delete('access_token')
  response.cookies.delete('masterPassword')

  return response
}

export const config = {
  matcher: '/api/logout',
}
