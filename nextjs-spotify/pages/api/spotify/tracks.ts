// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var access_token = null

  if (req.cookies.access_token) {
    access_token = req.cookies.access_token
  } else {
    access_token = req.headers.authorization
  }

  const spotify_base_url = 'https://api.spotify.com/v1/me/tracks?limit=50'

  const query = await fetch(spotify_base_url, {
    headers: {
      Authorization: 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    },
  })

  const tracks = await query.json()

  res.status(200).json({
    tracks
  })
}
