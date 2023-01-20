import os
import boto3
import logging

client = boto3.client('dynamodb')

def scan_table():
    response = client.scan(
        TableName = os.environ['Table']
    )

    return response['Items']

def update_item(id, access_token, refresh_token):
    response = client.update_item(
        TableName = os.environ['Table'],
        Key = {
            'id': {
                'S': id
            },
        },
        UpdateExpression = "SET access_token=:access_token, refresh_token=:refresh_token",
        ExpressionAttributeValues = {
            ":access_token": {
                'S': access_token
            },
            ":refresh_token": {
                'S': refresh_token
            }
        }
    )

    logging.info(response)