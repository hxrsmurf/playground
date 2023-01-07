import { createClient } from 'redis'
import { v4 as uuidv4 } from 'uuid'

export default async function page() {
  const id = uuidv4()
  const client = createClient({ url: process.env.REDIS_URL })
  client.on('error', (err) => console.log('Redis Client Error', err))
  await client.connect()
  await client.hSet(id, 'field', 'value')
  const value = await client.hGetAll('key')

  const blah = await client.keys('*')

  console.log(blah)
  return (
    <div>
      <div>Hello World</div>
      {blah.map((b: string) => (
        <div>{b}</div>
      ))}
    </div>
  )
}