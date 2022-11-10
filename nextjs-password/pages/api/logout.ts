// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db_record_login_logout } from '../../database/logs'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const ip = req.socket.remoteAddress
  db_record_login_logout(ip, 'logout')

  //https://stackoverflow.com/a/62367655
  // This is actually done via middleware.
  res.setHeader(
    'set-cookie',
    'access_token=none;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  )

  res.setHeader(
    'set-cookie',
    'email=none;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  )

  res.setHeader(
    'set-cookie',
    'masterPassword=none;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  )

  console.log('Logout')
  res.status(200).send({ message: 'Successfully logged out' })
}
