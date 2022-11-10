// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { aes256String } from '../../utils/encryption'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body
  const encryptedMaster = await aes256String(body)

  res.setHeader('set-cookie', [
    'masterPassword=' + encryptedMaster + ';path=/;SameSite=Lax',
  ])
  res.status(201).json({ message: 'Successfully submitted password' })
}
