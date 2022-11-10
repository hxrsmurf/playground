import { PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb'
import { client } from './dynamodb'

export async function submitPassword(password: string, user: string) {
  const date = new Date()
  const params: PutItemCommandInput = {
    TableName: process.env.AWS_TABLE_NAME,
    Item: {
      pk: { S: 'passwords' },
      sk: { S: date },
      password: { S: password },
      user: {S: user}
    },
  }

  try {
    const data = await client.send(new PutItemCommand(params))
  } catch (err) {
    console.error(err)
  }
}
