import { redis_album } from '../../components/redis_client'

export default async function page({ params }: any) {
  const album = params['album'][1]
  const album_details = await redis_album(album)
  return (
    <div className='flex justify-center mt-14'>
      <div>
        <div className='text-3xl font-bold mb-4'>{album}</div>
        <div className='grid'>
          {Object.entries(album_details).map((album: any, id: any) => (
            <div key={id} className='mt-4 text-white'>
              {album.map((image: any, id: any) => (
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
