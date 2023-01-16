import logging
from functions.dynamodb import put_item

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    code = event['queryStringParameters']['code']
    logging.info(code)

    put_item(code)

    return ({
        'statusCode': 200,
        'body': 'Hello World'
    })