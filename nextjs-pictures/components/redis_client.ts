import { createClient } from 'redis'

const client = createClient({
  url: process.env.REDIS_URL,
})

client.on('error', (error) => console.log('Redis client error', error))

export async function redis_album(album: any) {
  client.connect()
  const redis_data = await client.hGet(album, 'files')
  client.disconnect()
  const json_data = JSON.parse(redis_data!)
  if (json_data) return json_data
  return null
}

export async function redis_get_all_albums() {
  client.connect()
  const redis_data = await client.KEYS('*')
  client.disconnect()
  const json_data = Object.values(redis_data).sort()
  return json_data
}
