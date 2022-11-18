// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader('set-cookie', [
    'access_token=' + null + ';path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'refresh_token=' + null + ';path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
  ])
  res.redirect('/')
  return
}