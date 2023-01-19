import os
import boto3
import logging

client = boto3.client('dynamodb')

def scan_table():
    response = client.scan(
        TableName = os.environ['Table']
    )

    return response['Items']