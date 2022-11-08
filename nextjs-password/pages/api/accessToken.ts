// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  access_token: string | undefined | null
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const access_token = req.cookies.access_token
  console.log(req, access_token)

  if (!access_token) res.status(401).send({access_token: null})
  res.status(200).json({ access_token: req.cookies.access_token })
}