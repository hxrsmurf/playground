import { headers } from "next/headers"

export function getCookies() {
  const cookies = headers().get('cookie')
  const split_cookies: any = cookies?.split('; ')
  try {
    const access_token = split_cookies[0].split('access_token=')[1]
    const refresh_token = split_cookies[1].split('refresh_token=')[1]
    const format_cookies = {
      access_token: access_token,
      refresh_token: refresh_token,
    }
    return format_cookies
  } catch {
    return { access_token: null, refresh_token: null }
  }
}