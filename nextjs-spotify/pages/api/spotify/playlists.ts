// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const refresh_token = req.cookies.refresh_token
  const spotify_base_url = 'https://api.spotify.com/v1/me/playlists'
  var spotify_final_url = spotify_base_url

  var access_token = null

  if (req.cookies.access_token) {
    access_token = req.cookies.access_token
  } else {
    access_token = req.headers.authorization
  }

  if (req.query.limit) {
    spotify_final_url = spotify_base_url + '?limit=' + req.query.limit
  }

  const query = await fetch(spotify_final_url, {
    headers: {
      Authorization: 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    },
  })

  if (query.status == 200) {
    const results = await query.json()
    res.status(200).send({ data: results })
    return
  } else {
    res.status(500).send({
      status: query.status,
      statusText: query.statusText,
    })
    return
  }
}
