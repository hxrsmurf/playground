// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  const cookie = request.cookies.get('access_token')?.value
  console.log(cookie) // => 'fast'
  const allCookies = request.cookies.getAll()
  console.log(allCookies) // => [{ name: 'vercel', value: 'fast' }]

  request.cookies.delete('access_token')

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next()
  console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/test' }
  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.

  response.cookies.set('access_token', 'none')

  return response
}

export const config = {
  matcher: '/api/logout',
}
