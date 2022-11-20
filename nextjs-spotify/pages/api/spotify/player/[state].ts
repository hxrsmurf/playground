// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const access_token = req.cookies.access_token
  const state = req.query.state
  const spotify_base_url = 'https://api.spotify.com/v1/me/player/' + state

  try {
    const query = await fetch(spotify_base_url, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + access_token,
        'Content-Type': 'application/json',
      },
    })
    const resp = await query.json()
    console.log(resp)

    res.send({ data: 'Success' })
  } catch (err) {
    res.send({ data: 'Failure' })
  }
}