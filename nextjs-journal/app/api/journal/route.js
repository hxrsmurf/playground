import { todayPage } from '@/lib/utils'
import { NextResponse } from 'next/server'
import { createClient } from 'redis'
export async function POST(request) {
  const client = createClient({
    url: 'redis://' + process.env.REDIS_SERVER + ':6379',
    legacyMode: false,
  })
  await client.connect()

  const data = await request.json()
  const redis_key = data['user'] + '-' + todayPage()
  await client.sAdd(redis_key, JSON.stringify(data))
  return NextResponse.json({ body: 'SUCCESS' })
}

export async function GET(request) {
  const client = createClient({
    url: 'redis://' + process.env.REDIS_SERVER + ':6379',
    legacyMode: false,
  })
  await client.connect()

  const user = 'test'
  const testing = await client.sScan(user, 0)
  return new Response(JSON.stringify(testing['members']), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
