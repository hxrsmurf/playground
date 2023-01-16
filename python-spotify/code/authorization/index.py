import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    code = event['queryStringParameters']['code']
    logging.info(code)