import { DynamoDB } from 'aws-sdk'

const client = new DynamoDB({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_KEY!,
  },
  region: process.env.REGION,
})

export async function listTables() {
  const tables = await client.listTables().promise()
  return tables['TableNames']
}

export async function listTracks(year: any) {
  var query_year = undefined
  const input_year = year

  if (year.length !== 7) {
    query_year = '2022-12'
  } else {
    query_year = year
  }

  var params: DynamoDB.QueryInput = {
    TableName: process.env.TABLE!,
    IndexName: process.env.TABLE_INDEX,
    KeyConditionExpression: 'year_month = :q',
    ExpressionAttributeValues: {
      ':q': {
        S: query_year,
      },
    },
  }

  // https://aws.amazon.com/blogs/developer/pagination-using-async-iterators-in-modular-aws-sdk-for-javascript/

  let hasNext = true
  let LastKey = undefined

  const tracks: any = []

  while (hasNext) {
    const response = await client.query(params).promise()
    const items: any = response['Items']
    items.forEach((element: any) => {
      tracks.push(element)
    })
    LastKey = response.LastEvaluatedKey
    if (LastKey) {
      params.ExclusiveStartKey = LastKey
    }
    hasNext = !!LastKey
  }

  return tracks
}
