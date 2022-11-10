// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db_record_login_logout } from '../../database/logs'

const querystring = require('querystring')

type Data = {
  url: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const ip = req.socket.remoteAddress
  db_record_login_logout(ip, 'login')
  const spotify_id = process.env.SPOTIFY_ID
  const options = {
    response_type: 'code',
    client_id: spotify_id,
    scope: 'user-read-email',
    redirect_uri: 'http://localhost:3000/api/callback',
  }

  const options_queryed = querystring.stringify(options)
  const spotify_url =
    'https://accounts.spotify.com/authorize?' + options_queryed
  res.status(200).json({ url: spotify_url })
}