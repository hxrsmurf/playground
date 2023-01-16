import logging
from functions.dynamodb import put_item
from functions.authorization import get_access_token

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    code = event['queryStringParameters']['code']

    put_item(code)

    access_token, refresh_token = get_access_token(code)

    return ({
        'statusCode': 200,
        'body': access_token + ' ' + refresh_token
    })