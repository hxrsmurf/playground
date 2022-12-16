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
  var tables: any = []

  await client.connect()

  const redis_tables = await client.get('tables')

  if (!redis_tables) {
    const db_tables = await listTables()
    tables = db_tables
    await client.set('tables', JSON.stringify(db_tables))
    console.log('Received from database')
  } else {
    console.log('Received from Redis')
    tables = JSON.parse(redis_tables)
  }

  await client.disconnect()

  res.status(200).json({ tables: tables })
}
