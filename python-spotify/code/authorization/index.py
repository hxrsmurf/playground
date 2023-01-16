import logging
from functions.dynamodb import put_item
from functions.authorization import get_access_token
from functions.me import me

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    code = event['queryStringParameters']['code']

    put_item(code)

    access_token, refresh_token = get_access_token(code)

    user_profile = me(access_token)

    return ({
        'statusCode': 200,
        'body': user_profile,
        'headers': {
            'Content-Type': 'application/json'
        }
    })