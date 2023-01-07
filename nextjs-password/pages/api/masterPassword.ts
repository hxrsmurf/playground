// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { aes256String, sha256String } from '../../utils/encryption'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body
  const sha256_master = await sha256String(body)
  const encryptedMaster = await aes256String(sha256_master)

  res.setHeader('set-cookie', [
    'masterPassword=' + encryptedMaster + ';path=/;SameSite=Lax',
  ])

  res.status(201).json({ message: 'Successfully submitted password' })
}
