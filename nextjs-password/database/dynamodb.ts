import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
const region = process.env.AWS_REGION //e.g. "us-east-1"
const access_key = process.env.AWS_ACCESS_KEY
const secret_key = process.env.AWS_SECRET_KEY
const client = new DynamoDBClient({
  region: region,
  credentials: { accessKeyId: access_key, secretAccessKey: secret_key },
})

export {client}