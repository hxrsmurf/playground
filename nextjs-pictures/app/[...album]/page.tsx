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
        <div className='text-3xl font-bold flex justify-center mb-6'>{decode_album}</div>
        <div className='grid xl:grid-cols-8 md:grid-cols-5 sm:grid-cols-3 mx-10'>
          {album_details.map((image: any, id: any) => (
            <div className='m-4' key={id}>
              <Image
                src={process.env.CDN_URL + image.folder + '/' + image.file}
                height={300}
                width={300}
                alt=''
                quality={25}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
