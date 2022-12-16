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

  res.status(200).json({ data })
}
