// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //https://stackoverflow.com/a/62367655
  res.setHeader('set-cookie', 'access_token=null;expires=Thu, 01 Jan 1970 00:00:00 GMT')
  res.redirect('/logout')
  res.status(200).send({message:'Successfully logged out'})
}
