import { headers } from 'next/headers'
import Content from './content'
import ProfileMenu from './profileMenu'
import Sidebar from './sidebar'

export default async function page() {
  const cookies = headers().get('cookie')
  const cookies_split = cookies?.split('; ') || ''

  const access_token = cookies_split[0].split('=')[1]
  const refresh_token = cookies_split[1].split('=')[1]

  const profile = await getProfile(access_token)
  const playlists = await getPlaylists(access_token)

  return (
    <div className='grid grid-cols-4'>
      <Sidebar data={playlists.data}/>
      <Content profile={profile} playlists={playlists}/>
      <ProfileMenu/>
    </div>
  )
}

async function getProfile(access_token: string) {
  const req = await fetch(process.env.API_URL + '/api/spotify/me', {
    method: 'GET',
    headers: {
      Authorization: access_token,
      'Content-Type': 'application/json',
    },
  })
  return req.json()
}

async function getPlaylists(access_token: string) {
  const req = await fetch(process.env.API_URL + '/api/spotify/playlists', {
    method: 'GET',
    headers: {
      Authorization: access_token,
      'Content-Type': 'application/json',
    },
  })
  return req.json()
}
