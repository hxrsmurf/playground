// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const access_token = req.cookies.access_token
  const refresh_token = req.cookies.refresh_token
  const spotify_base_url = 'https://api.spotify.com/v1/me/playlists'

  const query = await fetch(spotify_base_url, {
    headers: {
      Authorization: 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    },
  })

  const results = await query.json()

  res.status(200).send({ message: results })
}