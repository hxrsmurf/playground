import Link from 'next/link'

async function getSpotifyLink() {
  const res = await fetch(process.env.API_URL + '/api/auth/generateSpotifyLink')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const spotify_link = await getSpotifyLink()
  return (
    <div className='flex justify-center color:white'>
      <Link href={spotify_link.link}>Login to Spotify</Link>
    </div>
  )
}