import logging
from functions.dynamodb import scan_table, update_item
from functions.parse import parse_scan_table
from functions.me import me
from functions.tokens import get_refresh_token

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    parse_results = parse_scan_table(scan_table())
    for user in parse_results:
        id = user['id']
        access_token = user['access_token']
        refresh_token = user['refresh_token']

        profile = me(access_token)

        if not profile:
            print('Getting new refresh token')
            access_token, refresh_token, token_type = get_refresh_token(refresh_token)
            profile = me(access_token)
            update_item(id, access_token, refresh_token)

        print(profile)