// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { listTables } from '../../../components/dynamodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tables = await listTables()
  res.status(200).json({ tables: tables })
}
