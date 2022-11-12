import type { NextApiRequest, NextApiResponse } from 'next'
import { decryptCustomAES256Key } from '../../utils/encryption'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id = req.body
  const master_key = req.cookies.masterPassword
  const decrypted = await decryptCustomAES256Key(id, 'blah', master_key)
  res.status(200).json({ message: decrypted })
}
