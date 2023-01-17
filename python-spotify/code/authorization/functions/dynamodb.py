import os
import boto3
import logging

client = boto3.client('dynamodb')

def put_item(item):

    json_items = {}

    for key, value in item.items():
        json_items[key] = {
            'S': str(value)
        }

    response = client.put_item(
        TableName = os.environ['Table'],
        Item = json_items
    )

    logging.info(response)