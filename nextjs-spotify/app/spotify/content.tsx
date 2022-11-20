import Image from 'next/image'

export default function content(data: any) {
  const profile_data = data.profile.profile
  const playlist_data = data.playlists.data.items

  return (
    <div className='mt-6 col-span-2'>
      <div className='font-bold text-2xl'>
        Hello {profile_data.display_name}!
      </div>

      <div className='grid grid-cols-3 mt-6'>
        {Object.entries(playlist_data).map(([key, playlist]: any) => (
          <div key={playlist.id} className='grid grid-cols-3 items-center my-4 mx-4'>
            <div>
              <Image
                src={playlist.images[0].url}
                width={100}
                height={100}
                alt=''
              />
            </div>
            <div className='text-center col-span-2'>{playlist.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
