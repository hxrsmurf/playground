// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'redis'
import { listTracks } from '../../../components/dynamodb'

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  password: process.env.REDIS_PASSWORD,
})

client.on('error', (err) => console.log('Redis client error', err))

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var data: any = []

  await client.connect()
  const redis_data = await client.get('tracks')

  if (!redis_data) {
    const db_data = await listTracks()
    data = db_data
    await client.set('tracks', JSON.stringify(db_data))
    console.log('Getting data from db')
  } else {
    console.log('Getting data from redis')
    data = JSON.parse(redis_data)
  }

  await client.disconnect()

  var artists: any = []
  var artists_play_count: any = {}

  data.forEach((element: any) => {
    const artist_name = element['artist']['S']
    const repeat = element['possibleDuplicate']['BOOL']
    const song = element['song']['S']

    artists.push(artist_name)

    if (!repeat) {
      artists_play_count[artist_name] = artists_play_count[artist_name] + 1 || 1
    }
  })

  const unique_artists = Array.from(new Set(artists)).sort()

  // https://stackoverflow.com/questions/44275843/how-to-do-foreach-for-object-in-javascript
  // https://stackoverflow.com/questions/39336556/how-can-i-slice-an-object-in-javascript
  const sorted_top_artists = Object.fromEntries(
    Object.entries(artists_play_count)
      .sort(([, a]: any, [, b]: any): any => b - a)
      .slice(0, 10)
  )

  res.status(200).json({ data, unique_artists, sorted_top_artists })
}
