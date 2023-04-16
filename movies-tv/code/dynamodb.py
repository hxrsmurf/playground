# This writes to the DynamoDB.
import boto3

def write(timestamp, message_type, actual_message, user):
    client = boto3.client('dynamodb')
    response = client.update_item(
        TableName="moveies-tv",
        Key={
            'id': {
                'S': str(timestamp)
            }
        },
        AttributeUpdates={
            'message_type': {
                'Value': {
                    'S': str(message_type)
                }
            },
            'actual_message': {
                'Value': {
                    'S': str(actual_message)
                }
            },
            'user': {
                'Value': {
                    'S': str(user)
                }
            }
        }
    )

    return response