import json
import os

from functions.clerk import list_users, get_access_tokens
from functions.utils import get_user_ids
from functions.spotify import get_now_playing

clerk_base_url = os.environ.get('CLERK_BASE_URL')
spotify_base_url = os.environ.get('SPOTIFY_BASE_URL')

def handler(event, context):
    list_of_users = list_users()
    list_user_ids = get_user_ids(list_of_users)
    list_user_spotify_access_tokens = get_access_tokens(
        users=list_user_ids, provider="oauth_spotify")

    for user in list_user_spotify_access_tokens:
        token = user['token']
        user_id = user['user_id']
        now_playing = get_now_playing(token)

    return now_playing