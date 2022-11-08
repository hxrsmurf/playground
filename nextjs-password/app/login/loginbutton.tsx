import Link from 'next/link'

export default function LoginButton({ spotify_url }: any) {
  return (
    <Link href={spotify_url}>
      <button className='rounded-md bg-white text-black w-40 h-40'>
        Login
      </button>
    </Link>
  )
}
