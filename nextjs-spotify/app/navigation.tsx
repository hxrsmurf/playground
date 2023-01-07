import Link from 'next/link'
import { headers } from 'next/headers'
import Login from './login'

const links = [
  {
    name: 'Playlists',
    url: '/dashboard',
  },
  {
    name: 'Now Playing',
    url: '/now-playing',
  },
  {
    name: 'Top Artists',
    url: '/top/artists',
  },
  {
    name: 'Top Tracks',
    url: '/top/tracks',
  },
]

function getCookies() {
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

export default function navigation() {
  const cookies = getCookies()

  return (
    <div className='bg-blue-500 min-w-full min-h-[75px] flex justify-center pt-4 text-3xl space-x-8'>
      {cookies.access_token ? (
        <>
          {links.map((link) => (
            <div>
              <Link href={link.url} className='hover:bg-yellow-400'>
                {link.name}
              </Link>
            </div>
          ))}

          <div>
            <Login cookies={cookies} />
          </div>
        </>
      ) : (
        <>
          <div>
            <Login cookies={cookies} />
          </div>
        </>
      )}
    </div>
  )
}
