// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const year_month = req.query['year-month']
  console.log('API: ', year_month)
  res.status(200).json({ year_month: year_month })
}
