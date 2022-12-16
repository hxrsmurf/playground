import { DynamoDB } from 'aws-sdk'

const client = new DynamoDB({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_KEY!,
  },
  region: process.env.REGION,
})

export async function listTables(){
  const tables = await client.listTables().promise()
  return tables['TableNames']
}