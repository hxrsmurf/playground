import { todayPage } from '@/lib/utils'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { createClient } from 'redis'
export async function POST(request) {
  const client = createClient({
    url: 'redis://' + process.env.REDIS_SERVER + ':6379',
    legacyMode: false,
  })
  await client.connect()

  const data = await request.json()

  const headersList = headers()
  const authorization = headersList.get('authorization')
  const user = await client.get(authorization, 0)
  const file = data['file']
  const redis_key = user + '-' + file

  await client.sAdd(redis_key, JSON.stringify(data))
  return NextResponse.json({ body: 'SUCCESS' })
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const headersList = headers()
  const authorization = headersList.get('authorization')
  const api_key_params = searchParams.get('api')
  var api_key = null

  if (authorization) {
    api_key = authorization
  } else {
    api_key = api_key_params
  }

  const client = createClient({
    url: 'redis://' + process.env.REDIS_SERVER + ':6379',
    legacyMode: false,
  })

  await client.connect()

  const user = await client.get(api_key)

  if (!user) return new Response('Not valid API Key')

  const testing = await client.sScan(user, 0)

  const list_of_entries = []
  testing['members'].map((entry) => list_of_entries.push(JSON.parse(entry)))

  return new Response(JSON.stringify(list_of_entries), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
