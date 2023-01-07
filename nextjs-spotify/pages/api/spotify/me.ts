// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { redis_client } from '../../../redis/redis'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var access_token = null
  var email = null
  const url: string = req.url!

  if (req.cookies.access_token) {
    access_token = req.cookies.access_token
  } else {
    access_token = req.headers.authorization
  }

  if (req.cookies.email) {
    email = req.cookies.email
  }

  if (email) {
    const redis_data = await redis_client().hGet(email, url)

    if (redis_data) {
      console.log('Querying Redis!')
      await redis_client().quit()
      res.status(200).json({
        access_token: access_token,
        profile: JSON.parse(redis_data),
        redis: true,
      })
      return
    }
  }

  const spotify_base_url = 'https://api.spotify.com/v1/me'

  console.log('Querying API, no redis')
  const query = await fetch(spotify_base_url, {
    headers: {
      Authorization: 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    },
  })

  const results = await query.json()

  if (email) {
    email = results.email
    res.setHeader('set-cookie', ['email=' + results.email + ';path/'])

    await redis_client().hSet(email, url, JSON.stringify(results))
    await redis_client().EXPIRE(email, 600)
    await redis_client().quit()
  }

  res.status(200).json({
    access_token: access_token,
    refresh_token: 'nope',
    profile: results,
  })
}
