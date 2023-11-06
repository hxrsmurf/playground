import boto3
import os

dynamodb_table = os.environ.get('DYNAMODB_TABLE')

client = boto3.client('dynamodb')

def query(year_month, limit=100000000000000000000000000000000000000):
    response = client.query(
        TableName=dynamodb_table,
        IndexName="year_month-id-index",
        Limit = limit,
        KeyConditionExpression='year_month = :year_month',
        ExpressionAttributeValues={
            ':year_month': {
                'S': year_month
            }
        }
    )
    return response['Items']