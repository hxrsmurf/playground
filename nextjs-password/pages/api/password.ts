// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
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
  decryptCustomAES256Key,
  decryptServerSideMasterKey,
  encryptWithCustomAES256Key,
  sha256Email,
} from '../../utils/encryption'

type Data = {
  message: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const method = req.method
  const email = await sha256Email(req.cookies.email!)

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
    const result = await client.send(new QueryCommand(params))
    const items = result.Items
    let new_items: any[] = []
    const master_password: any = req.cookies.masterPassword

    if (master_password === undefined) {
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

      const decrypted_title_array = new_items.map(async (item) => {
        if (item.Title) {
          const decrypted_master = await decryptServerSideMasterKey(
            master_password
          )

          const decrypted_value = await decryptCustomAES256Key(
            item.Title,
            decrypted_master
          )

          return [...new_items, (item['Title'] = decrypted_value)]
        }

        return [...new_items]
      })

      Promise.all(decrypted_title_array).then((data) => {
        data.map((d) => {
          res.status(200).send({ message: d })
        })
      })
    }
  }

  if (method == 'PUT') {
    var item: any = {
      pk: { S: 'passwords' },
      sk: { S: uuid() },
      user: { S: await email },
    }
    const master_password: any = req.cookies.masterPassword

    const data = req.body
    Object.values(data).map(async (d: any) => {
      const title = d.name
      const value = d.value
      const encrypted_value = await encryptWithCustomAES256Key(
        value,
        master_password
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
