// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const querystring = require('querystring')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const scopes = [
    'user-read-playback-state',
    'playlist-modify-private',
    'playlist-modify-public',
    'user-top-read',
    'user-read-recently-played',
    'user-library-read',
    'user-read-private',
    'user-modify-playback-state',
    'streaming'
  ]
  const scopes_spaces = scopes.join(' ')
  const spotify_id = process.env.SPOTIFY_ID
  const options = {
    response_type: 'code',
    client_id: spotify_id,
    scope: scopes_spaces,
    redirect_uri: process.env.API_URL + '/api/auth/callback',
  }

  const options_query = querystring.stringify(options)
  const spotify_base_url = 'https://accounts.spotify.com/authorize?'
  const spotify_link = spotify_base_url + options_query

  res.status(200).json({ link: spotify_link })
}
