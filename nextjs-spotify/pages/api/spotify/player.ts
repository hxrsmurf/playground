// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const access_token = req.cookies.access_token
  const spotify_base_url = 'https://api.spotify.com/v1/me/player'

  const query = await fetch(spotify_base_url, {
    headers: {
      Authorization: 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    },
  })

  try {
    const results = await query.json()
    res.status(200).send({ data: results })
  } catch (err) {
    res.status(200).send({ data: 'none' })
  }
}