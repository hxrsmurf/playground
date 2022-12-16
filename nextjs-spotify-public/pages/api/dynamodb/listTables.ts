// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'redis'
import { listTables } from '../../../components/dynamodb'

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

  const redis_data = await client.get('tables')

  if (!redis_data) {
    const db_data = await listTables()
    data = db_data
    await client.set('tables', JSON.stringify(db_data))
  } else {
    data = JSON.parse(redis_data)
  }

  await client.disconnect()

  res.status(200).json({ tables: data })
}
