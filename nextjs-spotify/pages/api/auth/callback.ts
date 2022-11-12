// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.query.code?.toString()
  const spotify_id = process.env.SPOTIFY_ID
  const spotify_secret = process.env.SPOTIFY_SECRET
  const spotify_base_url = 'https://accounts.spotify.com/api/token'
  if (!code) res.status(401).send({ message: 'Invalid callback code.' })

  const query_auth_token = await fetch(spotify_base_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        new Buffer(spotify_id + ':' + spotify_secret).toString('base64'),
    },
    body: new URLSearchParams({
      code: code || false.toString(),
      redirect_uri: 'http://localhost:3000/api/auth/callback',
      grant_type: 'authorization_code',
    }),
  })

  const result_query = await query_auth_token.json()
  const access_token = result_query.access_token
  const refresh_token = result_query.refresh_token

  res.setHeader('set-cookie', [
    'access_token=' + access_token + ';path=/',
    'refresh_token=' + refresh_token + ';path=/',
  ])

  res.redirect('/dashboard')
  res
    .status(200)
    .json({ access_token: access_token, refresh_token: refresh_token })
}
