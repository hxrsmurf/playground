import logging

from functions.generate import generate_url

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):

    generated_url = generate_url()

    html = f"<html><a href='{generated_url}'>{generated_url}</a></html>"

    return ({
        'statusCode': 200,
        'body': generated_url
    })

    return ({
        'statusCode': 200,
        'body': html,
        'headers': {
            'Content-Type': 'text/html; charset=utf-8'
        }
    })