import Image from 'next/image'
import { redis_album } from '../../components/redis_client'

export default async function page({ params }: any) {
  const param_album = params['album'].slice(1)
  const join_album = param_album.join('/')
  const decode_album = decodeURI(join_album)
  const album_details = await redis_album(decode_album)

  return (
    <div className='flex justify-center mt-14'>
      <div>
        {!album_details ? (
          <div>Album Not Found</div>
        ) : (
          <>
            <div className='text-3xl font-bold mb-4'>{decode_album}</div>
            <div className='grid'>
              {Object.entries(album_details).map((album: any, id: any) => (
                <div key={id} className='mt-4 text-white'>
                  {album.map((image: any, id: any) => (
                    <div key={id}>
                      <div className='grid grid-cols-2'>
                        {!image.file ? (
                          <></>
                        ) : (
                          <>
                            <div>
                              <Image
                                src={
                                  process.env.CDN_URL +
                                  image.folder +
                                  '/' +
                                  image.file
                                }
                                height={200}
                                width={200}
                                alt=''
                                quality={25}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
