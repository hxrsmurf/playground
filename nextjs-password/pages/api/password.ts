// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/client-dynamodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { TEMPORARY_REDIRECT_STATUS } from 'next/dist/shared/lib/constants'
import { uuid } from 'uuidv4'
import { client } from '../../database/dynamodb'
import {
  aes256String,
  decryptCustomAES256Key,
  encryptWithCustomAES256Key,
  sha256Email,
} from '../../utils/encryption'

type Data = {
  message: object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const method = req.method
  const email = await sha256Email(req.cookies.email)

  if (method == 'GET') {
    const params: QueryCommandInput = {
      TableName: process.env.AWS_TABLE_NAME,
      IndexName: 'user-index',
      KeyConditionExpression: '#u = :user',
      ExpressionAttributeNames: { '#u': 'user' },
      ExpressionAttributeValues: {
        ':user': {
          S: email,
        },
      },
    }
    const client_command = await client.send(new QueryCommand(params))
    const result = await client_command
    const items = result.Items
    let new_items: any[] = []

    // Decrypt the Passwords
    if (req.cookies.masterPassword === undefined) {
      console.log('No master password set')
    } else {
      console.log('Master password is set')

      items?.map(async (item) => {
        let temp_array: any = {}
        Object.keys(item).map(async (i) => {
          const title = i
          const value = item[title].S
          temp_array[title] = value
        })
        new_items.push(temp_array)
      })
      res.status(200).send({ message: new_items })
    }
  }

  if (method == 'PUT') {
    var item: any = {
      pk: { S: 'passwords' },
      sk: { S: uuid() },
      user: { S: await email },
    }

    const data = req.body
    Object.values(data).map(async (d) => {
      const title = d.name
      const value = d.value
      const encrypted_value = await encryptWithCustomAES256Key(
        value,
        req.cookies.masterPassword
      )
      item[title] = { S: encrypted_value }
    })

    const params: PutItemCommandInput = {
      TableName: process.env.AWS_TABLE_NAME,
      Item: item,
    }

    try {
      await client.send(new PutItemCommand(params))
    } catch (err) {
      console.log(err)
    }

    res.status(201).json({ message: 'Successfully submitted password' })
  }
}
