// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { submitPassword } from '../../database/password'
import { aes256String, sha256Email } from '../../utils/encryption'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body
  console.log('password body', body)
  const user = await sha256Email(req.cookies.email)
  const password = await aes256String(body)
  submitPassword(body, user)
  res.status(201).json({ message: 'Successfully submitted password' })
}
