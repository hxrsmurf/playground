import { createClient } from 'redis'
export function redis_client() {
  const client = createClient({ url: process.env.REDIS_URL, password: process.env.REDIS_PASSWORD })
  client.on('error', (err) => console.log('Redis Client Error', err))
  client.connect()
  return client
}
