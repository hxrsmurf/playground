// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const access_token = req.cookies.access_token
  const type = req.query.type
  const time_range = req.query.time_range
  const limit = 50
  const spotify_base_url =
    'https://api.spotify.com/v1/me/top/' +
    type +
    '?limit=' +
    limit +
    '&time_range=' +
    time_range

  const query = await fetch(spotify_base_url, {
    headers: {
      Authorization: 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    },
  })

  const results = await query.json()

  res.status(200).send({ data: results.items })
}
