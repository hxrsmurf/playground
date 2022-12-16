// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { redis } from '../../../redis'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  redis()
    .connect()
    .then(() => {
      console.log('Connected to Redis')
      res.status(200).json({ message: 'Connected to Redis' })
    })
    .catch((error) => {
      console.log('Error with Redis', error)
      res.status(500).json({ message: error.code })
    })
}
