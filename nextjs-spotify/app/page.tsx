import Link from 'next/link'

export default async function Home() {
  const query = await fetch(
    'http://localhost:3000/api/auth/generateSpotifyLink'
  )
  const spotify_link = (await query.json()).link
  console.log(spotify_link)

  return (
    <div className='flex justify-center'>
      <Link href={spotify_link}>Login</Link>
    </div>
  )
}
