import logging
from functions.dynamodb import scan_table
from functions.parse import parse_scan_table
from functions.me import me
from functions.tokens import get_refresh_token

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    parse_results = parse_scan_table(scan_table())
    for user in parse_results:
        access_token = user['access_token']
        refresh_token = user['refresh_token']

        profile = me(access_token)

        if not profile:
            print('Getting new token')
            access_token, refresh_token, token_type = get_refresh_token(refresh_token)
            profile = me(access_token)
            print(profile)