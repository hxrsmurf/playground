import Link from 'next/link'
import { redis_get_all_albums } from '../components/redis_client'

export default async function Home() {
  const all_albums = await redis_get_all_albums()
  return (
    <div className='flex justify-center mt-14'>
      <div>
        <div>Album Name</div>
        <div className='grid'>
          {all_albums.map((album: any, id: any) => (
            <div key={id}>
              <div>
                <Link href={'album/' + album}>{album}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
