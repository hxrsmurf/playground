import { PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb'
import { client } from './dynamodb'

const date = new Date()

export async function db_record_login_logout(
  ip: string | undefined,
  type: string
) {
  const params: PutItemCommandInput = {
    TableName: process.env.AWS_TABLE_NAME,
    Item: {
      pk: { S: 'logs' },
      sk: { S: date.toString() },
      ip: { S: ip! },
      type: { S: type },
    },
  }

  try {
    const data = await client.send(new PutItemCommand(params))
  } catch (err) {
    console.error(err)
  }
}
