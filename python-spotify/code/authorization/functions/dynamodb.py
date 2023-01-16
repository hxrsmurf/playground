import os
import boto3

client = boto3.client('dynamodb')

def put_item(item):
    response = client.put_item(
        TableName=os.environ['Table'],
        Item={
            'id': {
                'S': item,
            }
        },
    )

    logging.info(response)