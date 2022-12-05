import { redis_album } from '../components/redis_client'

export default async function Home() {
  const album = await redis_album('')
  return (
    <div className='flex justify-center mt-14'>
      <div>
        <div>Album Name</div>
        <div className='grid'>
          {Object.entries(album).map((a: any, id: any) => (
            <div key={id} className='mt-4 text-white'>
              {a.map((image: any, id: any) => (
                <div key={id}>
                  <div>{image.file}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
