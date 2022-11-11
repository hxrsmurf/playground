// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/client-dynamodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { uuid } from 'uuidv4'
import { client } from '../../database/dynamodb'
import { aes256String, sha256Email } from '../../utils/encryption'

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

    res.status(200).send({ message: result.Items })
  }

  if (method == 'PUT') {
    var item: any = {
      pk: { S: 'passwords' },
      sk: { S: uuid() },
      user: { S: await email },
    }

    const data = req.body
    Object.values(data).map((d) => {
      const title = d.name
      const value = d.value
      item[title] = { S: value }
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

  res.status(200).json({ message: 'Loaded password' })
}
