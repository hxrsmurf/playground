import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookies = request.cookies.get('access_token')?.value

  const res = await fetch(process.env.API_URL + '/api/spotify/me')
  const resp = await res.json()
  const profile = resp.profile

  if (!cookies) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/spotify'],
}