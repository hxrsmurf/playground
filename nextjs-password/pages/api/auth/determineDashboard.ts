import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const access_token = req.cookies.access_token
  console.log('Dashboard', access_token)
  if (!access_token || access_token === 'none') {
    res.status(401).json({ message: 'Unauthorized' })
  }
  res.status(200).json({ message: 'Loggedin' })
}
