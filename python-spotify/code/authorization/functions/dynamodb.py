import os
import boto3
import logging

client = boto3.client('dynamodb')

def put_item(user_profile, access_token, refresh_token):

    json_items = {
        'access_token' : {
            'S': access_token
        },
        'refresh_token' : {
            'S': refresh_token
        }
    }

    for key, value in user_profile.items():
        json_items[key] = {
            'S': str(value)
        }

    response = client.put_item(
        TableName = os.environ['Table'],
        Item = json_items
    )

    logging.info(response)