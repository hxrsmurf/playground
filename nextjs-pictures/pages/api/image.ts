// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // https://www.nginx.com/blog/securing-urls-secure-link-module-nginx-plus/

  var crypto = require('crypto')

  function generateHash(){
    const binaryHash = crypto.createHash("md5").update(process.env.CDN_SECRET).digest()
    const base64_value = new Buffer(binaryHash).toString('base64')
    return base64_value
  }

  console.log(generateHash())
  res.status(200).json({ name: 'John Doe' })
}
