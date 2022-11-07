// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const spotify_code = req.query.code
  const spotify_id = process.env.SPOTIFY_ID
  const spotify_secret = process.env.SPOTIFY_SECRET
  if (!spotify_code) res.status(401).send({ message: 'Invalid callback code.' })

  const auth_options = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: spotify_code,
      redirect_uri: 'http://localhost:3000/api/callback',
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(spotify_id + ':' + spotify_secret).toString('base64'),
    },
    json: true,
  }

  const auth_token = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        new Buffer(spotify_id + ':' + spotify_secret).toString('base64'),
    },
    body: new URLSearchParams({
      code: spotify_code,
      redirect_uri: 'http://localhost:3000/api/callback',
      grant_type: 'authorization_code',
    }),
  })

  const result = await auth_token.json()

  res.setHeader('set-cookie', 'access_token=' + result.access_token)
  res.redirect('/login')
}
