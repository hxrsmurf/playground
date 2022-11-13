import Link from 'next/link'

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

export default function navigation() {
  return (
    <div className='bg-blue-500 min-w-full min-h-[75px] flex justify-center pt-4 text-3xl space-x-8'>
      {links.map((link) => (
        <div>
          <Link href={link.url} className='hover:bg-yellow-400'>
            {link.name}
          </Link>
        </div>
      ))}
    </div>
  )
}
