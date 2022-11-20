import { getCookies } from '../../../../utils/utils'
import ProfileMenu from '../../profileMenu'
import Sidebar from '../../sidebar'
import Playlist from './playlist'

interface props {
  params: {
    id: string
  }
  searchParams: {}
}

async function getPlaylist(id: string, access_token: string) {
  const req = await fetch(process.env.API_URL + '/api/spotify/playlist/' + id, {
    method: 'GET',
    headers: {
      Authorization: access_token,
      'Content-Type': 'application/json',
    },
  })
  const res = await req.json()
  return res.results
}

export default async function page({ params, searchParams }: props) {
  const id = params.id
  const cookies = getCookies()
  const playlist_information = await getPlaylist(id, cookies.access_token)

  return (
    <div className='grid grid-cols-4'>
      <Sidebar />
      <Playlist data={playlist_information}/>
      <ProfileMenu />
    </div>
  )
}
